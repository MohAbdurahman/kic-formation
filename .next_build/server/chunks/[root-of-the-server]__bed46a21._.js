module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},43972,e=>{"use strict";var t=e.i(47909),r=e.i(74017),n=e.i(96250),s=e.i(59756),a=e.i(61916),o=e.i(74677),i=e.i(69741),l=e.i(16795),d=e.i(87718),p=e.i(95169),u=e.i(47587),c=e.i(66012),x=e.i(70101),g=e.i(26937),h=e.i(10372),v=e.i(93695);e.i(52474);var f=e.i(220),m=e.i(89171);let b=new(e.i(46245)).Resend(process.env.RESEND_API_KEY);async function R(e){try{var t,r,n,s,a,o;console.log("=== API SEND-TEST-RESULTS CALLED ===");let i=await e.json();console.log("Request body:",i);let{firstName:l,email:d,language:p,level:u,score:c,totalQuestions:x,percentage:g}=i;if(!l||!d||!p||!u)return console.error("Missing required fields:",{firstName:l,email:d,language:p,level:u}),m.NextResponse.json({error:"Missing required fields"},{status:400});if(!process.env.RESEND_API_KEY)return console.warn("RESEND_API_KEY not configured. Email not sent."),m.NextResponse.json({success:!1,message:"Email service not configured"},{status:503});let h="francais"===p?"Français":"Anglais";console.log("Language label:",h),console.log("Sending email to:",d),console.log("From:",process.env.EMAIL_FROM||"KIC-FORMATIONS <onboarding@resend.dev>");let{data:v,error:f}=await b.emails.send({from:process.env.EMAIL_FROM||"KIC-FORMATIONS <onboarding@resend.dev>",to:[d],subject:`R\xe9sultats de votre test de niveau ${h} - KIC-FORMATIONS`,html:(t=l,r=h,n=u,s=c,a=x,o=g,`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #25318D 0%, #4F46E5 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .result-box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #25318D;
          }
          .level-badge {
            display: inline-block;
            background: linear-gradient(135deg, #25318D 0%, #4F46E5 100%);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 18px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎓 R\xe9sultats de votre test de niveau</h1>
          <p>KIC-FORMATIONS - Centre de formation \xe0 Gen\xe8ve</p>
        </div>

        <div class="content">
          <p>Bonjour <strong>${t}</strong>,</p>

          <p>Merci d'avoir pass\xe9 le test de niveau en ${r} chez KIC-FORMATIONS !</p>

          <div class="result-box">
            <h2>Vos r\xe9sultats :</h2>
            <p><strong>Niveau recommand\xe9 :</strong> <span class="level-badge">${n}</span></p>
            <p><strong>Score :</strong> ${s}/${a} questions correctes (${o}%)</p>
          </div>

          <p>Nous vous recommandons de consulter nos formations de niveau <strong>${n}</strong> pour continuer votre apprentissage.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.kic-formations.ch/formations?categorie=langues" class="button">
              D\xe9couvrir nos formations
            </a>
          </div>

          <h3>📞 Besoin d'aide ou de conseils ?</h3>
          <p>Notre \xe9quipe est \xe0 votre disposition pour r\xe9pondre \xe0 vos questions et vous conseiller sur la formation la plus adapt\xe9e \xe0 vos besoins.</p>

          <ul>
            <li>📧 Email : <a href="mailto:info@kic-formations.ch">info@kic-formations.ch</a></li>
            <li>📱 T\xe9l\xe9phone : <a href="tel:+41772112323">+41 77 211 23 23</a></li>
            <li>📍 Adresse : Rue des P\xe2quis 11, 1201 Gen\xe8ve</li>
          </ul>

          <p><strong>Horaires :</strong><br>
          Lundi-Vendredi : 9h-18h<br>
          Samedi : 9h-12h</p>
        </div>

        <div class="footer">
          <p>\xa9 2025 KIC-FORMATIONS. Tous droits r\xe9serv\xe9s.</p>
          <p style="font-size: 12px;">Rue des P\xe2quis 11, 1201 Gen\xe8ve, Suisse</p>
        </div>
      </body>
    </html>
  `)});if(f)return console.error("Resend error:",JSON.stringify(f,null,2)),m.NextResponse.json({error:"Failed to send email",details:f},{status:500});return console.log("Email sent successfully:",v),await b.emails.send({from:process.env.EMAIL_FROM||"KIC-FORMATIONS <onboarding@resend.dev>",to:[process.env.EMAIL_TO||"info@kic-formations.ch"],replyTo:d,subject:`Nouveau test de niveau ${h} - ${l} (${u})`,html:`
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
              .level-badge { display: inline-block; background: linear-gradient(135deg, #25318D 0%, #4F46E5 100%); color: white; padding: 6px 16px; border-radius: 16px; font-weight: bold; font-size: 16px; }
              .footer { text-align: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Nouveau test de niveau pass\xe9</h1>
              <p>${h} \xb7 Niveau obtenu : <strong>${u}</strong></p>
            </div>
            <div class="content">
              <div class="info-box">
                <p><span class="label">Pr\xe9nom :</span> ${l}</p>
                <p><span class="label">Email :</span> <a href="mailto:${d}">${d}</a></p>
                <p><span class="label">Langue test\xe9e :</span> ${h}</p>
                <p><span class="label">Niveau recommand\xe9 :</span> <span class="level-badge">${u}</span></p>
                <p><span class="label">Score :</span> ${c??"—"}/${x??"—"} (${g??"—"}%)</p>
              </div>
              <p style="color:#6b7280; font-size:13px;">Vous pouvez r\xe9pondre directement \xe0 cet email pour contacter l'\xe9tudiant(e).</p>
            </div>
            <div class="footer">
              <p>Notification automatique depuis kic-formations.ch</p>
            </div>
          </body>
        </html>
      `}),m.NextResponse.json({success:!0,message:"Email sent successfully",data:v})}catch(e){return console.error("Error sending test results email:",e),console.error("Error details:",JSON.stringify(e,null,2)),m.NextResponse.json({error:"Failed to send email",message:e instanceof Error?e.message:"Unknown error"},{status:500})}}e.s(["POST",()=>R],90076);var E=e.i(90076);let w=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/send-test-results/route",pathname:"/api/send-test-results",filename:"route",bundlePath:""},distDir:".next_build",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/send-test-results/route.ts",nextConfigOutput:"",userland:E}),{workAsyncStorage:y,workUnitAsyncStorage:A,serverHooks:N}=w;function C(){return(0,n.patchFetch)({workAsyncStorage:y,workUnitAsyncStorage:A})}async function O(e,t,n){w.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let m="/api/send-test-results/route";m=m.replace(/\/index$/,"")||"/";let b=await w.prepare(e,t,{srcPage:m,multiZoneDraftMode:!1});if(!b)return t.statusCode=400,t.end("Bad Request"),null==n.waitUntil||n.waitUntil.call(n,Promise.resolve()),null;let{buildId:R,params:E,nextConfig:y,parsedUrl:A,isDraftMode:N,prerenderManifest:C,routerServerContext:O,isOnDemandRevalidate:S,revalidateOnlyGenerated:T,resolvedPathname:k,clientReferenceManifest:I,serverActionsManifest:P}=b,_=(0,i.normalizeAppPath)(m),$=!!(C.dynamicRoutes[_]||C.routes[k]),q=async()=>((null==O?void 0:O.render404)?await O.render404(e,t,A,!1):t.end("This page could not be found"),null);if($&&!N){let e=!!C.routes[k],t=C.dynamicRoutes[_];if(t&&!1===t.fallback&&!e){if(y.experimental.adapterPath)return await q();throw new v.NoFallbackError}}let M=null;!$||w.isDev||N||(M="/index"===(M=k)?"/":M);let D=!0===w.isDev||!$,F=$&&!D;P&&I&&(0,o.setManifestsSingleton)({page:m,clientReferenceManifest:I,serverActionsManifest:P});let j=e.method||"GET",H=(0,a.getTracer)(),K=H.getActiveScopeSpan(),U={params:E,prerenderManifest:C,renderOpts:{experimental:{authInterrupts:!!y.experimental.authInterrupts},cacheComponents:!!y.cacheComponents,supportsDynamicResponse:D,incrementalCache:(0,s.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:y.cacheLife,waitUntil:n.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,n,s)=>w.onRequestError(e,t,n,s,O)},sharedContext:{buildId:R}},L=new l.NodeNextRequest(e),z=new l.NodeNextResponse(t),B=d.NextRequestAdapter.fromNodeNextRequest(L,(0,d.signalFromNodeResponse)(t));try{let o=async e=>w.handle(B,U).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=H.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=r.get("next.route");if(n){let t=`${j} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t)}else e.updateName(`${j} ${m}`)}),i=!!(0,s.getRequestMeta)(e,"minimalMode"),l=async s=>{var a,l;let d=async({previousCacheEntry:r})=>{try{if(!i&&S&&T&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let a=await o(s);e.fetchMetrics=U.renderOpts.fetchMetrics;let l=U.renderOpts.pendingWaitUntil;l&&n.waitUntil&&(n.waitUntil(l),l=void 0);let d=U.renderOpts.collectedTags;if(!$)return await (0,c.sendResponse)(L,z,a,U.renderOpts.pendingWaitUntil),null;{let e=await a.blob(),t=(0,x.toNodeOutgoingHttpHeaders)(a.headers);d&&(t[h.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==U.renderOpts.collectedRevalidate&&!(U.renderOpts.collectedRevalidate>=h.INFINITE_CACHE)&&U.renderOpts.collectedRevalidate,n=void 0===U.renderOpts.collectedExpire||U.renderOpts.collectedExpire>=h.INFINITE_CACHE?void 0:U.renderOpts.collectedExpire;return{value:{kind:f.CachedRouteKind.APP_ROUTE,status:a.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:n}}}}catch(t){throw(null==r?void 0:r.isStale)&&await w.onRequestError(e,t,{routerKind:"App Router",routePath:m,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:S})},!1,O),t}},p=await w.handleResponse({req:e,nextConfig:y,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:C,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:T,responseGenerator:d,waitUntil:n.waitUntil,isMinimalMode:i});if(!$)return null;if((null==p||null==(a=p.value)?void 0:a.kind)!==f.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",S?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),N&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let v=(0,x.fromNodeOutgoingHttpHeaders)(p.value.headers);return i&&$||v.delete(h.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||v.get("Cache-Control")||v.set("Cache-Control",(0,g.getCacheControlHeader)(p.cacheControl)),await (0,c.sendResponse)(L,z,new Response(p.value.body,{headers:v,status:p.value.status||200})),null};K?await l(K):await H.withPropagatedContext(e.headers,()=>H.trace(p.BaseServerSpan.handleRequest,{spanName:`${j} ${m}`,kind:a.SpanKind.SERVER,attributes:{"http.method":j,"http.target":e.url}},l))}catch(t){if(t instanceof v.NoFallbackError||await w.onRequestError(e,t,{routerKind:"App Router",routePath:_,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:S})},!1,O),$)throw t;return await (0,c.sendResponse)(L,z,new Response(null,{status:500})),null}}e.s(["handler",()=>O,"patchFetch",()=>C,"routeModule",()=>w,"serverHooks",()=>N,"workAsyncStorage",()=>y,"workUnitAsyncStorage",()=>A],43972)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__bed46a21._.js.map