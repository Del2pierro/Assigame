/**
 * @file api.types.ts
 * @layer Types — Contrats API
 * @role  Types génériques représentant la structure des requêtes et réponses API.
 *        Garantit que toute la couche service respecte un contrat uniforme.
 *
 * @exports
 *  - ApiResponse<T>      : Wrapper générique { data: T, message?: string }
 *  - ApiError            : { status: number, message: string, errors?: Record<string, string> }
 *  - PaginatedResponse<T>: { content: T[], totalElements: number, totalPages: number, page: number }
 *  - RequestStatus       : Enum { IDLE, LOADING, SUCCESS, ERROR }
 */

// Implémentation à venir
