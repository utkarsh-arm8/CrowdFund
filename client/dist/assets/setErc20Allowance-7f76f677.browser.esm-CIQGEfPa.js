const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CBGS744k.js","assets/index-Djp-cZ_d.css"])))=>i.map(i=>d[i]);
import{b9 as w,c as N,a1 as S,Z as n,bS as l,bT as h,bU as c}from"./index-CBGS744k.js";const e=n.object({}).catchall(n.union([c,n.unknown()])),u=n.union([n.array(n.array(e)).transform(a=>a.flat()),n.array(e),e]).optional().nullable(),x=n.object({name:n.union([n.string(),n.number()]).optional().nullable(),description:n.string().nullable().optional().nullable(),image:l.nullable().optional(),animation_url:l.optional().nullable()}),b=x.extend({external_url:l.nullable().optional(),background_color:h.optional().nullable(),properties:u,attributes:u}).catchall(n.union([c,n.unknown()])),O=n.union([b,n.string()]),k=b.extend({id:n.string(),uri:n.string(),image:n.string().nullable().optional(),external_url:n.string().nullable().optional(),animation_url:n.string().nullable().optional()});async function F(a,t,o,i){if(w(o))i.value=t;else{const p=(await N(async()=>{const{default:_}=await import("./index-CBGS744k.js").then(f=>f.ek);return{default:_}},__vite__mapDeps([0,1]))).default,g=a.getSigner(),m=a.getProvider(),r=new S(g||m,o,p,a.options,a.storage),d=await a.getSignerAddress(),s=a.address;return(await r.read("allowance",[d,s])).lt(t)&&await r.sendTransaction("approve",[s,t]),i}}export{x as B,b as C,O as N,k as a,F as s};