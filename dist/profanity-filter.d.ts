export declare class ProfanityFilter {
    private readonly dictionary;
    constructor(extraWords?: string[]);
    /**
     * Remove tudo que não é letra (a-z, acentuados), converte para minúsculo
     * e mapeia acentos para equivalentes ASCII.
     *
     * "V;a;i t.o.m.a.r n-o c-u" → "vaitormarnocu"
     * "Arrômbadó"                → "arrombado"
     */
    private normalize;
    /**
     * Retorna true se o texto contém algum palavrão do dicionário.
     */
    hasProfanity(text: string): boolean;
    /**
     * Retorna a lista de palavrões encontrados no texto.
     */
    findProfanities(text: string): string[];
}
