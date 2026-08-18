# Portfólio de Vítor Almeida

Portfólio estático construído com Eleventy e publicado pelo GitHub Pages.

## Editar o conteúdo

Os trabalhos ficam em arquivos JSON dentro de `src/_data/`:

- `reportagens.json`: reportagens e podcasts;
- `projetos.json`: bases, visualizações, mapas, dashboards e ferramentas;
- `publicacoes.json`: artigos e outras publicações acadêmicas;
- `apresentacoes.json`: congressos e apresentações;
- `perfil.json`: biografia, formação, experiência, cursos e habilidades;
- `site.json`: identidade, metadados e links profissionais.

Imagens de projetos devem ser colocadas em `src/assets/images/projects/`. Use preferencialmente WebP ou AVIF, com uma descrição objetiva no campo `alt`.

Campos sem conteúdo podem ser omitidos. Os componentes escondem automaticamente links, imagens e embeds inexistentes.

## Desenvolvimento local

```bash
pnpm install
pnpm dev
```

O site estará disponível em `http://localhost:8080/meu-portifolio/`.

## Gerar o site

```bash
pnpm build
```

Os arquivos prontos serão gerados em `_site/`.
