const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CBGS744k.js","assets/index-Djp-cZ_d.css"])))=>i.map(i=>d[i]);
import{c as _,a1 as c}from"./index-CBGS744k.js";async function f(e,a,t){const n=e.getProvider(),r=(await _(async()=>{const{default:o}=await import("./index-CBGS744k.js").then(l=>l.ek);return{default:o}},__vite__mapDeps([0,1]))).default,s=new c(n,a,r,{},e.storage),d=await e.getSignerAddress(),i=e.address;return(await s.read("allowance",[d,i])).gte(t)}export{f as h};