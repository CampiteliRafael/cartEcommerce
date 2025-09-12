/**
 * Utilitários para formatação de valores
 */

/**
 * Formata um valor para moeda brasileira (BRL)
 * @param value Valor a ser formatado
 * @returns String formatada (ex: R$ 1.234,56)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Formata uma data para o formato brasileiro
 * @param date Data a ser formatada
 * @param includeTime Se deve incluir a hora
 * @returns String formatada (ex: 01/01/2023 ou 01/01/2023 14:30)
 */
export function formatDate(date: Date | string, includeTime = false): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return new Intl.DateTimeFormat('pt-BR', options).format(dateObj);
}

/**
 * Trunca um texto para o tamanho especificado
 * @param text Texto a ser truncado
 * @param maxLength Tamanho máximo
 * @returns Texto truncado com "..." no final se necessário
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Formata um número com separadores de milhar
 * @param value Valor a ser formatado
 * @returns String formatada (ex: 1.234)
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

/**
 * Formata um número de telefone brasileiro
 * @param phone Número de telefone (apenas dígitos)
 * @returns String formatada (ex: (11) 98765-4321)
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7, 11)}`;
  } else if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6, 10)}`;
  }
  
  return phone;
}

/**
 * Formata um CEP brasileiro
 * @param cep CEP (apenas dígitos)
 * @returns String formatada (ex: 12345-678)
 */
export function formatCEP(cep: string): string {
  const cleaned = cep.replace(/\D/g, '');
  
  if (cleaned.length === 8) {
    return `${cleaned.substring(0, 5)}-${cleaned.substring(5, 8)}`;
  }
  
  return cep;
}

/**
 * Formata um CPF brasileiro
 * @param cpf CPF (apenas dígitos)
 * @returns String formatada (ex: 123.456.789-09)
 */
export function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return `${cleaned.substring(0, 3)}.${cleaned.substring(3, 6)}.${cleaned.substring(6, 9)}-${cleaned.substring(9, 11)}`;
  }
  
  return cpf;
}