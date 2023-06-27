import textToDino from './tradino.js'
import titleToDinos from './tradinos.js'

/**
 * Parcourt itérativement tous les descendants du noeud donné à la recherche de noeuds de type texte
 * @param {*} node Le noeud de départ
 * @returns Une liste de noeuds de type texte dont le contenu n'est pas vide
 */
export function getTextNode (node) {
    let nodes = []
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.length > 0) {
        nodes.push(node)
    } else {
        node.childNodes.forEach(childNode => {
            nodes = [...nodes, ...getTextNode(childNode)]
        })
    }
    return nodes
}

/**
 * Applique la fonction de traduction donnée sur tous les noeuds d'un sélecteur CSS
 * @param {string} pattern Le noeud de départ
 * @param {function} action Le noeud de départ
 */
async function translate (pattern, action) {
    const textNodes = Array.from(document.querySelectorAll(pattern))
        .map(getTextNode)
        .flat()
    textNodes.map(action)
}

translate('p', textToDino)
translate('h1, h2', titleToDinos)

/**
 * TODO:
 * - Utiliser l'API chrome.runtime.onMessage afin de pouvoir communiquer avec le service-worker
 * - Créer un type de message afin de traduire sur demande
 */
