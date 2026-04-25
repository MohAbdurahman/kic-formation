module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81317,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),s=e.i(61916),o=e.i(74677),i=e.i(69741),l=e.i(16795),d=e.i(87718),p=e.i(95169),u=e.i(47587),c=e.i(66012),x=e.i(70101),h=e.i(26937),g=e.i(10372),m=e.i(93695);e.i(52474);var f=e.i(220),v=e.i(89171);let b=new(e.i(46245)).Resend(process.env.RESEND_API_KEY);async function R(e){try{let{firstName:t,lastName:r,email:a,phone:n,subject:s,formation:o,message:i}=await e.json();if(!t||!r||!a||!s||!i)return v.NextResponse.json({error:"Champs obligatoires manquants"},{status:400});if(!process.env.RESEND_API_KEY)return v.NextResponse.json({error:"Service email non configuré"},{status:503});let l={information:"Demande d'information",inscription:"Question sur une inscription",partenariat:"Partenariat / Entreprise",reclamation:"Réclamation",autre:"Autre"}[s]||s,{error:d}=await b.emails.send({from:process.env.EMAIL_FROM||"KIC-FORMATIONS <onboarding@resend.dev>",to:[process.env.EMAIL_TO||"info@kic-formations.ch"],replyTo:a,subject:`Nouveau message de contact - ${l}`,html:`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #25318D 0%, #4F46E5 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .info-box { background: white; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #25318D; }
              .label { font-weight: bold; color: #25318D; }
              .message-box { background: white; padding: 20px; border-radius: 8px; margin: 16px 0; border: 1px solid #e5e7eb; white-space: pre-wrap; }
              .footer { text-align: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Nouveau message de contact</h1>
              <p>${l}</p>
            </div>
            <div class="content">
              <div class="info-box">
                <p><span class="label">Nom :</span> ${t} ${r}</p>
                <p><span class="label">Email :</span> <a href="mailto:${a}">${a}</a></p>
                <p><span class="label">T\xe9l\xe9phone :</span> ${n||"Non renseigné"}</p>
                <p><span class="label">Sujet :</span> ${l}</p>
                <p><span class="label">Formation :</span> ${o?({"francais-a1":"Français A1","francais-a2":"Français A2","francais-b1":"Français B1","francais-b2":"Français B2","anglais-a1-a2":"Anglais A1/A2","anglais-b1":"Anglais B1","anglais-b2":"Anglais B2",bureautique:"Bureautique ECDL",informatique:"Découverte Numérique",autre:"Autre"})[o]||o:"Non spécifiée"}</p>
              </div>
              <h3>Message :</h3>
              <div class="message-box">${i}</div>
            </div>
            <div class="footer">
              <p>Message envoy\xe9 depuis le formulaire de contact du site kic-formations.ch</p>
            </div>
          </body>
        </html>
      `});if(d)return console.error("Resend error:",d),v.NextResponse.json({error:"Erreur lors de l'envoi de l'email"},{status:500});return await b.emails.send({from:process.env.EMAIL_FROM||"KIC-FORMATIONS <onboarding@resend.dev>",to:[a],subject:"Nous avons bien reçu votre message - KIC-FORMATIONS",html:`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #25318D 0%, #4F46E5 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .footer { text-align: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Merci pour votre message !</h1>
              <p>KIC-FORMATIONS - Centre de formation \xe0 Gen\xe8ve</p>
            </div>
            <div class="content">
              <p>Bonjour <strong>${t}</strong>,</p>
              <p>Nous avons bien re\xe7u votre message concernant : <strong>${l}</strong>.</p>
              <p>Notre \xe9quipe vous r\xe9pondra dans les <strong>24 heures ouvr\xe9es</strong>.</p>
              <p>En attendant, n'h\xe9sitez pas \xe0 nous contacter directement :</p>
              <ul>
                <li>Email : <a href="mailto:info@kic-formations.ch">info@kic-formations.ch</a></li>
                <li>T\xe9l\xe9phone : <a href="tel:+41772112323">+41 77 211 23 23</a></li>
                <li>Adresse : Rue des P\xe2quis 11, 1201 Gen\xe8ve</li>
              </ul>
              <p>Cordialement,<br><strong>L'\xe9quipe KIC-FORMATIONS</strong></p>
            </div>
            <div class="footer">
              <p>&copy; 2025 KIC-FORMATIONS. Tous droits r\xe9serv\xe9s.</p>
              <p>Rue des P\xe2quis 11, 1201 Gen\xe8ve, Suisse</p>
            </div>
          </body>
        </html>
      `}),v.NextResponse.json({success:!0})}catch(e){return console.error("Error sending contact email:",e),v.NextResponse.json({error:"Erreur lors de l'envoi",message:e instanceof Error?e.message:"Erreur inconnue"},{status:500})}}e.s(["POST",()=>R],81091);var E=e.i(81091);let w=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/send-contact/route",pathname:"/api/send-contact",filename:"route",bundlePath:""},distDir:".next_build",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/send-contact/route.ts",nextConfigOutput:"",userland:E}),{workAsyncStorage:A,workUnitAsyncStorage:y,serverHooks:C}=w;function N(){return(0,a.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:y})}async function O(e,t,a){w.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let v="/api/send-contact/route";v=v.replace(/\/index$/,"")||"/";let b=await w.prepare(e,t,{srcPage:v,multiZoneDraftMode:!1});if(!b)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:R,params:E,nextConfig:A,parsedUrl:y,isDraftMode:C,prerenderManifest:N,routerServerContext:O,isOnDemandRevalidate:T,revalidateOnlyGenerated:I,resolvedPathname:k,clientReferenceManifest:P,serverActionsManifest:S}=b,q=(0,i.normalizeAppPath)(v),_=!!(N.dynamicRoutes[q]||N.routes[k]),j=async()=>((null==O?void 0:O.render404)?await O.render404(e,t,y,!1):t.end("This page could not be found"),null);if(_&&!C){let e=!!N.routes[k],t=N.dynamicRoutes[q];if(t&&!1===t.fallback&&!e){if(A.experimental.adapterPath)return await j();throw new m.NoFallbackError}}let M=null;!_||w.isDev||C||(M="/index"===(M=k)?"/":M);let D=!0===w.isDev||!_,F=_&&!D;S&&P&&(0,o.setManifestsSingleton)({page:v,clientReferenceManifest:P,serverActionsManifest:S});let $=e.method||"GET",H=(0,s.getTracer)(),K=H.getActiveScopeSpan(),U={params:E,prerenderManifest:N,renderOpts:{experimental:{authInterrupts:!!A.experimental.authInterrupts},cacheComponents:!!A.cacheComponents,supportsDynamicResponse:D,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:A.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>w.onRequestError(e,t,a,n,O)},sharedContext:{buildId:R}},B=new l.NodeNextRequest(e),L=new l.NodeNextResponse(t),G=d.NextRequestAdapter.fromNodeNextRequest(B,(0,d.signalFromNodeResponse)(t));try{let o=async e=>w.handle(G,U).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=H.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${$} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${$} ${v}`)}),i=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var s,l;let d=async({previousCacheEntry:r})=>{try{if(!i&&T&&I&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await o(n);e.fetchMetrics=U.renderOpts.fetchMetrics;let l=U.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=U.renderOpts.collectedTags;if(!_)return await (0,c.sendResponse)(B,L,s,U.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,x.toNodeOutgoingHttpHeaders)(s.headers);d&&(t[g.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==U.renderOpts.collectedRevalidate&&!(U.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&U.renderOpts.collectedRevalidate,a=void 0===U.renderOpts.collectedExpire||U.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:U.renderOpts.collectedExpire;return{value:{kind:f.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await w.onRequestError(e,t,{routerKind:"App Router",routePath:v,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:T})},!1,O),t}},p=await w.handleResponse({req:e,nextConfig:A,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:N,isRoutePPREnabled:!1,isOnDemandRevalidate:T,revalidateOnlyGenerated:I,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:i});if(!_)return null;if((null==p||null==(s=p.value)?void 0:s.kind)!==f.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",T?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),C&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,x.fromNodeOutgoingHttpHeaders)(p.value.headers);return i&&_||m.delete(g.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,h.getCacheControlHeader)(p.cacheControl)),await (0,c.sendResponse)(B,L,new Response(p.value.body,{headers:m,status:p.value.status||200})),null};K?await l(K):await H.withPropagatedContext(e.headers,()=>H.trace(p.BaseServerSpan.handleRequest,{spanName:`${$} ${v}`,kind:s.SpanKind.SERVER,attributes:{"http.method":$,"http.target":e.url}},l))}catch(t){if(t instanceof m.NoFallbackError||await w.onRequestError(e,t,{routerKind:"App Router",routePath:q,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:T})},!1,O),_)throw t;return await (0,c.sendResponse)(B,L,new Response(null,{status:500})),null}}e.s(["handler",()=>O,"patchFetch",()=>N,"routeModule",()=>w,"serverHooks",()=>C,"workAsyncStorage",()=>A,"workUnitAsyncStorage",()=>y],81317)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__8fc199ec._.js.map