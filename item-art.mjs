import {ITEMS} from './data.mjs';
export function itemCell(id){
 const item=ITEMS[id];if(!item)return 32;
 const tier=Number(id.match(/\d+$/)?.[0]||0);
 if(id.startsWith('log'))return [0,1,1,1,1,2,2,3,4,4][tier]??4;
 if(id.startsWith('ore'))return [5,5,6,7,6,8,7,8,9,9][tier]??9;
 if(id.startsWith('fish'))return [10,10,11,10,12,13,11,13,14,14][tier]??14;
 if(id.startsWith('herb'))return [15,16,16,16,17,18,18,19,19,19][tier]??19;
 if(item.type==='equipment')return {head:20,armor:21,weapon:22,accessory:23}[item.slot];
 return {snare:24,food:25,treat:26,revive:27,appraise:28,lure:35,key:34,automation:23}[item.type]??({fiber:29,scrap:30,dust:31,fragment:33}[id]??32);
}
export function itemArt(id){const cell=itemCell(id);return `<span class="item-art" style="background-position:${cell%6*20}% ${Math.floor(cell/6)*20}%" aria-hidden="true"></span>`;}
