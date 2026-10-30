# Checklist de validación — retirada de repos retirados de los mapeos activos (2026-10-30)

> Se sobrescribe en cada entrega; el historial queda en Git.

**Repositorio:** anclora-design-system
**Rama:** development
**Datos:** no se usaron ni modificaron datos de aplicación.

## 1. Qué cambia
- Se retira el logo, el mapeo de tier, la celda de preview y el selector de tema de `anclora-syncxml-showcase` (repositorio retirado).
- El perfil de auditoría `portfolio` deja de citar `anclora-playa-viva-uniestate` (repositorio histórico fuera de AOS).
- `anclora-insights-adn` y las referencias históricas (CHANGELOG) no cambian.

## 2. Ya comprobado por el agente
| Comprobación | Resultado |
| --- | --- |
| `verify:manifest`, `verify:html`, `verify:adoption-contract`, `verify:token-contract` | PASS |
| `git diff --check` | PASS |

## 3. NOT_RUN
Resto de verificaciones de contrato y de release: el cambio solo retira activos y referencias de un producto retirado.

## 4. Para Toni
Sin pasos manuales. Bloqueante: no.
