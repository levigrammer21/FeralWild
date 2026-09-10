import {validate,clone,newGame} from './engine.mjs';
const KEY='feralwild.save.v1';
export function checksum(text){let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16);}
export function encode(state){const payload=JSON.stringify(validate(state));return JSON.stringify({format:'feralwild',checksum:checksum(payload),payload});}
export function decode(text){if(text.length>5000000)throw Error('Save file is too large.');const env=JSON.parse(text);if(env.format!=='feralwild'||typeof env.payload!=='string'||env.checksum!==checksum(env.payload))throw Error('Save integrity check failed.');return validate(JSON.parse(env.payload));}
export function load(){let error=null;for(const key of [KEY,KEY+'.backup',KEY+'.older']){try{const text=localStorage.getItem(key);if(text)return {state:decode(text),recovered:key!==KEY,error};}catch(e){error=e.message;}}return {state:error?null:newGame(),recovered:false,error};}
export function save(state){const text=encode(state);const previous=localStorage.getItem(KEY);if(previous){try{decode(previous);const backup=localStorage.getItem(KEY+'.backup');if(backup)localStorage.setItem(KEY+'.older',backup);localStorage.setItem(KEY+'.backup',previous);}catch{/* Never promote a damaged primary save. */}}localStorage.setItem(KEY,text);}
export function exportSave(state){const blob=new Blob([encode(clone(state))],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`Feralwild-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
export const saveKey=KEY;
