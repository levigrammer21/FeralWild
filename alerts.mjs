export async function enableNotifications(){
 if(!globalThis.isSecureContext||!('Notification' in globalThis))return 'Browser notifications are unavailable here. In-game rare alerts still work.';
 const permission=await Notification.requestPermission();return permission==='granted'?'Browser notifications enabled.':'Notifications were not enabled. In-game rare alerts still work.';
}
export async function notifyRare(notice,enabled){
 if(globalThis.document?.hidden||!enabled||!notice||notice.notified||!('Notification' in globalThis)||Notification.permission!=='granted')return false;
 try{const body=notice.names.join(', ')+'. Your hunt is paused and the encounter is safe.';const registration=await navigator.serviceWorker?.getRegistration();
 if(globalThis.document?.hidden)return false;
 if(registration?.active)await registration.showNotification('Feralwild · Rare encounter!',{body,tag:'feralwild-'+notice.id,icon:'icon.svg',data:{url:new URL('./',location.href).href}});
 else{const notification=new Notification('Feralwild · Rare encounter!',{body,tag:'feralwild-'+notice.id});notification.onclick=()=>{window.focus();notification.close();};}
 notice.notified=true;return true;
 }catch{return false;}
}
