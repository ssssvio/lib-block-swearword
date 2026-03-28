import { ProfanityFilter } from '../profanity-filter.js';

const filter = new ProfanityFilter();

const tests: { input: string; expected: boolean; label: string }[] = [
  // Direto
  { input: 'caralho', expected: true, label: 'palavra direta' },
  { input: 'Isso é uma merda', expected: true, label: 'palavra no meio da frase' },

  // Espaçado: "V a i t o m a r n o c u"
  { input: 'V a i t o m a r n o c u', expected: true, label: 'espaçado com espaços' },

  // Separado com ponto-e-vírgula: "V;a;i;t;o;m;a;r;n;o;c;u"
  { input: 'V;a;i;t;o;m;a;r;n;o;c;u', expected: true, label: 'separado com ;' },

  // Separado com pontos
  { input: 'p.u.t.a', expected: true, label: 'separado com .' },

  // Com acentos
  { input: 'Arrômbadó', expected: true, label: 'acentuado' },

  // Upper case
  { input: 'CARALHO', expected: true, label: 'upper case' },

  // Mixed case e separadores
  { input: 'C-a-R-a-L-h-O', expected: true, label: 'mixed case + hífens' },

  // Limpos - não devem dar match
  { input: 'Bom dia, tudo bem?', expected: false, label: 'frase limpa' },
  { input: 'Realme Note 50', expected: false, label: 'modelo de aparelho' },
  { input: 'João da Silva', expected: false, label: 'nome normal' },
  { input: 'Preciso de ajuda com meu celular', expected: false, label: 'frase de suporte' },

  // Siglas
  { input: 'vsfd mano', expected: true, label: 'sigla vsfd' },
  { input: 'vtnc', expected: true, label: 'sigla vtnc' },

  // Frase composta com palavrão oculto
  { input: 'vc é uma p_u_t_a', expected: true, label: 'underscore separator' },
  { input: 'vceumfesesseufilhadaputa', expected: true, label: 'frase composta sem separadores' },
  { input: 'vceumfrouxo@gmail.com ', expected: true, label: 'email com palavrão' },
];

let passed = 0;
let failed = 0;

for (const t of tests) {
  const result = filter.hasProfanity(t.input);
  if (result === t.expected) {
    console.log(`  ✓ ${t.label}`);
    passed++;
  } else {
    console.error(`  ✗ ${t.label}: "${t.input}" → got ${result}, expected ${t.expected}`);
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
