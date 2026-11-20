# Cómo cambiar o añadir fotos (sin saber programar)

Todas las fotos están en la carpeta **public/img**.

## A) REEMPLAZAR una foto (lo más fácil)
Sube tu foto con **exactamente el mismo nombre** que la que quieres cambiar, y GitHub la sustituye.

| Archivo | Dónde sale en la web | Formato |
| --- | --- | --- |
| `hero.png` | Portada y foto "Black Sand" de Travel | Horizontal |
| `retrato-1.png` | Portfolio: "Carmen, 81" | Vertical |
| `boda-1.png` | Portfolio: "Petals" | Horizontal |
| `retrato-2.png` | Portfolio: "Julián in August" | Vertical |
| `calle-2.png` | Portfolio: "After the Rain" | Horizontal |
| `boda-2.png` | Portfolio: "Hands" | Vertical |
| `calle-1.png` | Portfolio: "Five O'Clock Light" | Vertical |
| `paisaje-1.png` | Travel: "Valley Mist" | Horizontal |
| `paisaje-2.png` | Travel: "Olive Grove, Last Light" | Horizontal |
| `studio.png` | Sección About | Vertical |
| `sobre-mi.png` | No se usa en la web | - |

Pasos en GitHub:
1. Entra en tu repositorio, carpeta `public` y luego `img`.
2. Pulsa **Add file** y luego **Upload files**.
3. Arrastra tu foto (con el mismo nombre) y pulsa **Commit changes**.
4. Netlify publica el cambio solo en 1 o 2 minutos.

Consejos:
- Usa la misma orientación (horizontal o vertical) que la foto que sustituyes.
- Cada foto debe pesar menos de 25 MB. Lo ideal son 2 o 3 MB.
- El nombre debe ser idéntico, con mayúsculas y la extensión `.png`.

## B) AÑADIR fotos nuevas o cambiar títulos y lugares
Para fotos nuevas hay que registrar cada una en `src/data/site.ts` (título, lugar, año, tamaño real). Es lo único que requiere código.

Lo más sencillo: súbeme las fotos nuevas con el título, lugar y año de cada una, y te devuelvo un ZIP actualizado o los archivos listos para pegar.
