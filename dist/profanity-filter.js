import wordList from '../word-list.json' with { type: 'json' };
export class ProfanityFilter {
    dictionary;
    constructor(extraWords) {
        const raw = [...new Set([...wordList, ...(extraWords ?? [])])];
        this.dictionary = raw.map((w) => this.normalize(w));
    }
    /**
     * Remove tudo que não é letra (a-z, acentuados), converte para minúsculo
     * e mapeia acentos para equivalentes ASCII.
     *
     * "V;a;i t.o.m.a.r n-o c-u" → "vaitormarnocu"
     * "Arrômbadó"                → "arrombado"
     */
    normalize(input) {
        return input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // strip acentos
            .replace(/[^a-z]/g, ''); // só letras
    }
    /**
     * Retorna true se o texto contém algum palavrão do dicionário.
     */
    hasProfanity(text) {
        const normalized = this.normalize(text);
        return this.dictionary.some((word) => word.length >= 2 && normalized.includes(word));
    }
    /**
     * Retorna a lista de palavrões encontrados no texto.
     */
    findProfanities(text) {
        const normalized = this.normalize(text);
        return this.dictionary.filter((word) => word.length >= 2 && normalized.includes(word));
    }
}
