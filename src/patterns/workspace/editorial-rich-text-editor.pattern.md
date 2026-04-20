# Editorial Rich Text Editor

## Objetivo

Patron canonico para superficies de edicion textual avanzadas.

## Anatomia

1. `ac-text-editor`
2. `ac-text-editor__toolbar`
3. `ac-text-editor__toolbar-section`
4. `ac-text-editor__button`
5. `ac-text-editor__popover`
6. `ac-text-editor__content`
7. `ac-text-editor__footer`

## Restricciones

- La integracion con Tiptap u otro motor es responsabilidad del consumidor.
- El sistema define shell, jerarquia y estados visuales, no comandos editoriales.
