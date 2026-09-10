// Capture the browser's one-use installation offer without interrupting play.
let offer=null;
const display=window.matchMedia('(display-mode: standalone)');
let installed=display.matches||navigator.standalone===true;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();offer=event;});
window.addEventListener('appinstalled',()=>{installed=true;offer=null;});
export function installPanel(){
 const launched=display.matches||navigator.standalone===true;
 return `<h2>Feralwild on your home screen</h2><p>${launched?'You’re playing in the installed app.':installed?'Feralwild is installed. Open its home-screen icon to play in the app.':'Give your companions a home on your phone. Launch Feralwild in its own window, with offline play after the game has loaded online.'}</p>${launched||installed?'':'<button class="primary" data-action="install-app">Install Feralwild</button><small>Before your first app launch, export a save backup or sync your cloud save. If the app opens a new journey, restore your existing save.</small>'}`;
}
export async function installGame(){
 if(installed||display.matches||navigator.standalone===true)return {title:'Already installed',body:'<p>Open Feralwild from your home screen to play in its own app window.</p>'};
 if(offer){const prompt=offer;offer=null;try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==='accepted'){installed=true;return {title:'Installation accepted',body:'<p>Your browser will finish adding Feralwild. Open its icon from your home screen.</p>'};}return {title:'Install whenever you’re ready',body:'<p>Your journey is still here. You can install later from your browser’s menu.</p>'};}catch{/* Fall back to the browser-specific instructions below. */}}
 const apple=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 return {title:'Install Feralwild',body:apple?'<p>Open this game in <strong>Safari</strong>. Tap <strong>Share → Add to Home Screen</strong>, leave <strong>Open as Web App</strong> enabled if shown, then tap <strong>Add</strong>.</p><p>Launch Feralwild using its new home-screen icon.</p>':'<p>In Chrome or your phone’s browser, open the <strong>⋮ menu</strong> and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>. Confirm installation, then open the Feralwild icon.</p><p>If your browser does not offer installation, open the game’s HTTPS address in Chrome or Safari.</p>'};
}
