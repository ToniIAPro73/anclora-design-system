#!/usr/bin/env python3
"""Deterministic, lightweight PDF renderer for the canonical V1 Markdown manual."""
from pathlib import Path
import html
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, Preformatted, KeepTogether, HRFlowable,
)

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/release/ANCLORA-DESIGN-SYSTEM-V1-COMPLETE.md"
OUTPUT = ROOT / "docs/release/ANCLORA-DESIGN-SYSTEM-V1-COMPLETE.pdf"

PAGE_W, PAGE_H = A4
MARGIN_X = 19 * mm
TOP = 20 * mm
BOTTOM = 18 * mm

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverKicker", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=colors.HexColor("#78d6d0"), alignment=TA_CENTER, spaceAfter=12))
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=30, leading=34, textColor=colors.white, alignment=TA_CENTER, spaceAfter=10))
styles.add(ParagraphStyle(name="CoverSub", parent=styles["Normal"], fontName="Helvetica", fontSize=14, leading=18, textColor=colors.HexColor("#d9e1ec"), alignment=TA_CENTER, spaceAfter=22))
styles.add(ParagraphStyle(name="H1V1", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=18, leading=22, textColor=colors.HexColor("#173b66"), spaceBefore=16, spaceAfter=8, keepWithNext=True))
styles.add(ParagraphStyle(name="H2V1", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=12.5, leading=16, textColor=colors.HexColor("#146e78"), spaceBefore=11, spaceAfter=5, keepWithNext=True))
styles.add(ParagraphStyle(name="H3V1", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=colors.HexColor("#2e4057"), spaceBefore=8, spaceAfter=4, keepWithNext=True))
styles.add(ParagraphStyle(name="BodyV1", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.8, leading=12.2, textColor=colors.HexColor("#243447"), spaceAfter=6))
styles.add(ParagraphStyle(name="BulletV1", parent=styles["BodyV1"], leftIndent=11, firstLineIndent=-7, bulletIndent=2, spaceAfter=3))
styles.add(ParagraphStyle(name="CodeV1", parent=styles["Code"], fontName="Courier", fontSize=7.1, leading=9, textColor=colors.HexColor("#173b66"), backColor=colors.HexColor("#eef5f8"), borderPadding=7, leftIndent=4, rightIndent=4, spaceBefore=4, spaceAfter=7))
styles.add(ParagraphStyle(name="TableHeaderV1", parent=styles["BodyV1"], fontName="Helvetica-Bold", textColor=colors.white))
styles.add(ParagraphStyle(name="TOCHeading", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=20, leading=24, textColor=colors.HexColor("#173b66"), spaceAfter=14))
styles.add(ParagraphStyle(name="TOCEntry", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.5, leading=14, textColor=colors.HexColor("#24506e"), leftIndent=8, spaceAfter=2))

def inline(value: str) -> str:
    value = html.escape(value, quote=False)
    value = re.sub(r"`([^`]+)`", r'<font name="Courier" color="#146e78">\1</font>', value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", value)
    value = re.sub(r"\[([^]]+)\]\(#([^)]+)\)", r"\1", value)
    return value

def footer(canvas, doc):
    canvas.saveState()
    if doc.page == 1:
        canvas.setFillColor(colors.HexColor("#10243d"))
        canvas.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    else:
        canvas.setStrokeColor(colors.HexColor("#d7e1e8"))
        canvas.line(MARGIN_X, PAGE_H - 13 * mm, PAGE_W - MARGIN_X, PAGE_H - 13 * mm)
        canvas.setFont("Helvetica-Bold", 7.5)
        canvas.setFillColor(colors.HexColor("#406176"))
        canvas.drawString(MARGIN_X, PAGE_H - 10 * mm, "ANCLORA DESIGN SYSTEM - V1 REFERENCE")
        canvas.setFont("Helvetica", 7.5)
        canvas.drawRightString(PAGE_W - MARGIN_X, 10 * mm, f"1.0.0  |  {doc.page}")
    canvas.restoreState()

class V1DocTemplate(BaseDocTemplate):
    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph):
            style = flowable.style.name
            if style == "H1V1": self.notify("TOCEntry", (0, flowable.getPlainText(), self.page))
            elif style == "H2V1": self.notify("TOCEntry", (1, flowable.getPlainText(), self.page))

def parse_markdown(text):
    lines = text.splitlines()
    story = []
    in_code = False
    code = []
    table = []
    first_h1 = True
    in_front_matter = False
    front_matter_seen = False
    for raw in lines:
        line = raw.rstrip()
        if not front_matter_seen and line == "---":
            if not in_front_matter:
                in_front_matter = True
                front_matter_seen = True
            else:
                in_front_matter = False
            continue
        if in_front_matter:
            if line == "---":
                in_front_matter = False
            continue
        if line.startswith("```"):
            if in_code:
                story.append(Preformatted("\n".join(code), styles["CodeV1"]))
                code = []
                in_code = False
            else:
                in_code = True
            continue
        if in_code:
            code.append(line)
            continue
        if line.startswith("# "):
            if first_h1:
                first_h1 = False
            story.append(Paragraph(inline(line[2:]), styles["H1V1"]))
            continue
        if line.startswith("## "):
            story.append(Paragraph(inline(line[3:]), styles["H2V1"]))
            continue
        if line.startswith("### "):
            story.append(Paragraph(inline(line[4:]), styles["H3V1"]))
            continue
        if line == "---":
            if table:
                story.append(render_table(table)); table = []
            story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#c9d7df"), spaceBefore=4, spaceAfter=7))
            continue
        if line.startswith("|"):
            if line.replace("|", "").replace("-", "").replace(":", "").strip() == "":
                continue
            cells = [cell.strip() for cell in line.strip("|").split("|")]
            table.append(cells)
            continue
        if table:
            story.append(render_table(table)); table = []
        if not line:
            continue
        if line.startswith("- "):
            story.append(Paragraph("&#8226; " + inline(line[2:]), styles["BulletV1"]))
        elif re.match(r"^\d+\. ", line):
            story.append(Paragraph(inline(line), styles["BodyV1"]))
        elif line.startswith("> "):
            story.append(Paragraph("<i>" + inline(line[2:]) + "</i>", styles["BodyV1"]))
        elif line.startswith("**") and line.endswith("**"):
            story.append(Paragraph(inline(line), styles["H3V1"]))
        else:
            story.append(Paragraph(inline(line), styles["BodyV1"]))
    if table: story.append(render_table(table))
    return story

def render_table(rows):
    if not rows: return Spacer(1, 1)
    width = PAGE_W - 2 * MARGIN_X
    cols = max(len(row) for row in rows)
    data = []
    for row in rows:
        cells = row + [""] * (cols - len(row))
        cell_style = styles["TableHeaderV1"] if not data else styles["BodyV1"]
        data.append([Paragraph(inline(cell), cell_style) for cell in cells])
    col_widths = [width / cols] * cols
    tbl = Table(data, colWidths=col_widths, repeatRows=1, hAlign="LEFT")
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#173b66")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#c9d7df")),
        ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#f5f8fa")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#f5f8fa"), colors.white]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return KeepTogether([Spacer(1, 3), tbl, Spacer(1, 6)])

def main():
    text = SOURCE.read_text(encoding="utf-8")
    doc = V1DocTemplate(str(OUTPUT), pagesize=A4, leftMargin=MARGIN_X, rightMargin=MARGIN_X, topMargin=TOP, bottomMargin=BOTTOM, title="ANCLORA DESIGN SYSTEM - Complete V1 Reference", author="Anclora")
    frame = Frame(MARGIN_X, BOTTOM, PAGE_W - 2 * MARGIN_X, PAGE_H - TOP - BOTTOM, id="normal")
    doc.addPageTemplates([PageTemplate(id="v1", frames=frame, onPage=footer)])
    cover = [Spacer(1, 48 * mm), Paragraph("ANCLORA DESIGN SYSTEM", styles["CoverKicker"]), Paragraph("Complete V1 Reference", styles["CoverTitle"]), Paragraph("Stable architecture for the Anclora ecosystem", styles["CoverSub"]), Spacer(1, 10 * mm), Paragraph("Version 1.0.0<br/>Canonical SHA 215bdbec902914553ea5e4b63cc4808835cef6bf<br/>Release date 2026-09-22", ParagraphStyle("CoverMeta", parent=styles["CoverSub"], fontSize=10.5, leading=16)), PageBreak()]
    doc.build(cover + parse_markdown(text))
    print(f"Generated {OUTPUT}")

if __name__ == "__main__": main()
