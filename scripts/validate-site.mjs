import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const output = resolve("_site");
const required = [
  "index.html",
  "reportagens/index.html",
  "dados/index.html",
  "ponto-jornal/index.html",
  "pesquisa/index.html",
  "sobre/index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "assets/css/main.css",
  "assets/js/main.js",
  "assets/images/og.jpg",
  "assets/images/favicon.png"
];

const errors = [];

for (const path of required) {
  if (!existsSync(join(output, path))) errors.push(`Arquivo ausente: ${path}`);
}

function filesIn(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesIn(path) : [path];
  });
}

for (const file of filesIn(output).filter((path) => path.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const relative = file.slice(output.length + 1);

  if (!html.includes('<html lang="pt-BR">')) errors.push(`${relative}: idioma ausente`);
  if (!html.includes('<meta name="description"')) errors.push(`${relative}: descrição ausente`);
  if (!html.includes('<link rel="canonical"')) errors.push(`${relative}: canonical ausente`);
  if (!html.includes('property="og:title"')) errors.push(`${relative}: Open Graph ausente`);
  if (!html.includes('<main id="conteudo">')) errors.push(`${relative}: conteúdo principal ausente`);
  if (html.includes("href=\"undefined\"") || html.includes("src=\"undefined\"")) {
    errors.push(`${relative}: URL indefinida`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validação concluída: ${required.length} arquivos essenciais e todas as páginas HTML.`);
