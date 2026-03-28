# biblioteca-palavroes

Filtro de palavrões PT-BR com normalização avançada. Detecta ofensas mesmo com truques de evasão como espaçamento, separadores, acentos e caixa mista.

Inclui decorator `@NoProfanity()` para integração direta com [class-validator](https://github.com/typestack/class-validator).

## Instalação

```bash
npm install biblioteca-palavroes
```

## Uso Básico

```ts
import { ProfanityFilter } from 'biblioteca-palavroes';

const filter = new ProfanityFilter();

filter.hasProfanity('bom dia');           // false
filter.hasProfanity('vai tomar no cu');   // true
filter.hasProfanity('V;a;i;t;o;m;a;r');  // true (separadores removidos)
filter.hasProfanity('P U T A');           // true (espaços removidos)
filter.hasProfanity('Arrômbadó');         // true (acentos normalizados)

filter.findProfanities('seu idiota');     // ['idiota']
```

## Normalização

A biblioteca aplica 3 etapas antes de comparar com o dicionário:

1. **Lowercase** — `CARALHO` → `caralho`
2. **Strip acentos** (NFD) — `Arrômbadó` → `arrombado`
3. **Remove tudo que não é letra** — `V;a;i t.o.m.a.r` → `vaitormar`

Isso impede evasões como:

| Tentativa | Normalizado | Detectado? |
|-----------|-------------|------------|
| `p.u.t.a` | `puta` | ✅ |
| `V a i t o m a r n o c u` | `vaitormarnocu` | ✅ |
| `C-a-R-a-L-h-O` | `caralho` | ✅ |
| `p_u_t_a` | `puta` | ✅ |
| `VTNC` | `vtnc` | ✅ |

## Decorator para class-validator

```ts
import { NoProfanity } from 'biblioteca-palavroes';

class CreateUserDto {
  @NoProfanity({ message: 'O nome contém linguagem inadequada.' })
  name: string;
}
```

Rejeita automaticamente inputs ofensivos na camada de validação do NestJS/class-validator.

## Palavras customizadas

Você pode adicionar palavras extras ao dicionário padrão:

```ts
const filter = new ProfanityFilter(['palavraCustom1', 'palavraCustom2']);

filter.hasProfanity('isso é palavraCustom1'); // true
```

## Dicionário

O dicionário padrão está em `word-list.json` na raiz do pacote. Contém 400+ termos ofensivos em PT-BR incluindo:

- Palavrões diretos
- Siglas (vsfd, vtnc, tnc)
- Variações regionais
- Termos pejorativos

Para contribuir com novos termos, basta adicionar ao arquivo `word-list.json`.

## API

### `ProfanityFilter`

```ts
new ProfanityFilter(extraWords?: string[])
```

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `hasProfanity(text)` | `boolean` | `true` se encontrar algum palavrão |
| `findProfanities(text)` | `string[]` | Lista de palavrões encontrados |

### `@NoProfanity(options?)`

Decorator para class-validator. Aceita `ValidationOptions` padrão.

## Requisitos

- Node.js >= 18
- `class-validator >= 0.14.0` (peer dependency, apenas se usar o decorator)

## Licença

MIT
