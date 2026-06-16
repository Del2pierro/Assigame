/**
 * @file ui.store.ts
 * @layer Store — Global (Zustand)
 * @role  Store global pour l'état de l'interface utilisateur transversal.
 *        Évite le prop-drilling pour les éléments UI partagés.
 *
 * @state
 *  - toast          : { message, type ('success'|'error'|'info'), visible }
 *  - isLoading      : Indicateur de chargement global (ex: overlay plein écran)
 *  - modalOpen      : Identifiant de la modale actuellement ouverte (null si aucune)
 *
 * @actions
 *  - showToast()    : Affiche une notification toast
 *  - hideToast()    : Masque la notification
 *  - openModal()    : Ouvre une modale par identifiant
 *  - closeModal()   : Ferme la modale active
 *  - setLoading()   : Active/désactive le loader global
 *
 * ⚠️ Ce store ne doit contenir AUCUNE donnée métier.
 *    Il est réservé à l'état purement UI.
 */

// Implémentation à venir (Zustand)
