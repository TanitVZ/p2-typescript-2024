export const render = (pokemons : Array<string>) => {
    let html = `<html><body>`;
    for (const pok of pokemons) {
        console.log("pok",pok);
        html +=`<div>${JSON.stringify(pok)}</div>`;
    }
   html += `</body></html>`;
    return html;
}