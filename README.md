# Marina Solé · Fotografía de autor

Sitio web profesional de portafolio fotográfico: portada a pantalla completa, galería filtrable por categorías con visor ampliado, sección "Sobre mí", servicios con precios orientativos, testimonio y formulario de contacto.

> "Marina Solé", los textos, precios y fotografías son contenido de ejemplo. Cámbialos en `src/data/site.ts` y sustituye las imágenes de `public/img/` por tus propias fotografías.

## Tecnologías

- **TanStack Start** (React 19 + TanStack Router) con Vite
- **Tailwind CSS 4** con un tema oscuro cálido definido en `src/styles.css` (tipografías Bodoni Moda y Work Sans)
- **Netlify Image CDN** para servir cada foto redimensionada y en WebP
- **Netlify Forms** para recibir los mensajes del formulario de contacto (aparecen en el panel de Netlify → Forms)

## Ejecutar en local

```bash
pnpm install
netlify dev   # emula Image CDN y Forms; o bien `pnpm dev` para solo Vite
```

## Personalizar

| Qué                     | Dónde                                   |
| ----------------------- | --------------------------------------- |
| Nombre, email, teléfono | `site` en `src/data/site.ts`            |
| Fotos de la galería     | `photos` en `src/data/site.ts` + `public/img/` |
| Servicios y precios     | `services` en `src/data/site.ts`        |
| Colores y tipografías   | `:root` en `src/styles.css`             |

Al añadir una foto indica su `width` y `height` reales para que la galería reserve el espacio correcto.

## Ideas para más adelante

- Panel privado para subir fotos sin tocar código
- Galerías privadas para clientes con contraseña
- Páginas individuales por proyecto o boda
