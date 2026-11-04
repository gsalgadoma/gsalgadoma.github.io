/* SOCHIMI 2026 · Exportación local de la edición pública editable.
   Genera un PPTX desde el contenido de la versión web y no incluye imágenes clínicas. */
(function(){
  let libraryPromise;
  function ensureLibrary(){
    if(window.pptxgen)return Promise.resolve();
    if(libraryPromise)return libraryPromise;
    libraryPromise=new Promise((resolve,reject)=>{
      const s=document.createElement("script");
      s.src="https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@3.12.0/dist/pptxgen.bundle.js";
      s.onload=()=>window.pptxgen?resolve():reject(new Error("Biblioteca no disponible"));
      s.onerror=()=>reject(new Error("No se pudo cargar la biblioteca de PowerPoint"));
      document.head.appendChild(s);
    });
    return libraryPromise;
  }
  window.descargarPPTXSOCHIMI=async function(statusElement,button){
    const status=statusElement||null;
    if(button)button.disabled=true;
    if(status)status.textContent="Generando la versión editable del PowerPoint…";
    try{
      if(!Array.isArray(window.SOCHIMI_SLIDES)||!window.SOCHIMI_SLIDES.length)throw Error("No se encontraron las diapositivas.");
      await ensureLibrary();
      const pptx=new window.pptxgen();
      pptx.layout="LAYOUT_WIDE";
      pptx.author="Gabriel Salgado-Maldonado";
      pptx.subject="Congreso SOCHIMI 2026 · Material público de la charla";
      pptx.title="Abordaje fonoaudiológico en el trasplante pulmonar";
      pptx.company="Universidad de los Andes";
      pptx.lang="es-CL";
      pptx.theme={headFontFace:"Arial",bodyFontFace:"Arial",lang:"es-CL"};
      const navy="131E29",red="CE0019",white="FFFFFF",sub="DAE1E8",ink="263849",quiet="536679",light="F6F7F8";
      window.SOCHIMI_SLIDES.forEach((item,i)=>{
        const slide=pptx.addSlide();
        const isCover=i===0||i===window.SOCHIMI_SLIDES.length-1||item[0]==="MENSAJE FINAL";
        slide.background={color:isCover?navy:light};
        slide.addShape(pptx.ShapeType.rect,{x:0,y:0,w:0.14,h:7.5,line:{color:red,transparency:100},fill:{color:red}});
        slide.addShape(pptx.ShapeType.rect,{x:0.85,y:0.67,w:0.62,h:0.065,line:{color:red,transparency:100},fill:{color:red}});
        slide.addText((item[0]||"SOCHIMI 2026").toUpperCase(),{x:0.85,y:0.9,w:11.6,h:0.28,fontFace:"Arial",fontSize:11,bold:true,breakLine:false,charSpacing:1.6,color:isCover?"CFD5DC":red,margin:0});
        const title=String(item[1]||"");
        const titleSize=title.length>93?26:title.length>65?30:37;
        slide.addText(title,{x:0.85,y:1.45,w:11.85,h:2.0,fontFace:"Arial",fontSize:titleSize,bold:true,color:isCover?white:navy,margin:0,breakLine:false,fit:"shrink",valign:"mid"});
        const paras=String(item[2]||"").split("|").filter(Boolean);
        const available=3.25,top=3.7,step=Math.min(0.75,available/Math.max(1,paras.length));
        paras.slice(0,6).forEach((p,j)=>{
          slide.addShape(pptx.ShapeType.rect,{x:0.86,y:top+j*step+0.11,w:0.075,h:0.075,line:{color:red,transparency:100},fill:{color:red}});
          slide.addText(p,{x:1.08,y:top+j*step,w:11.15,h:Math.max(0.49,step-0.05),fontFace:"Arial",fontSize:p.length>135?14:p.length>88?16:19,color:isCover?sub:ink,margin:0,fit:"shrink",valign:"mid"});
        });
        slide.addShape(pptx.ShapeType.line,{x:0.85,y:7.07,w:11.65,h:0,line:{color:isCover?"53616E":"D4DADE",width:0.8}});
        const citation=String(item[3]||"SOCHIMI 2026 · UANDES");
        slide.addText(citation,{x:0.86,y:7.17,w:10.95,h:0.16,fontFace:"Arial",fontSize:8.5,color:isCover?"C1CBD3":quiet,margin:0});
        slide.addText(String(i+1).padStart(2,"0"),{x:12.13,y:7.14,w:0.35,h:0.2,fontFace:"Arial",fontSize:9,color:isCover?"CFD5DC":quiet,align:"right",margin:0});
      });
      await pptx.writeFile({fileName:"SOCHIMI_2026_Abordaje_fonoaudiologico_Version_publica_editable.pptx"});
      if(status)status.textContent="PowerPoint generado y listo para descargar (27 diapositivas; versión pública sin imágenes clínicas).";
    }catch(e){
      if(status)status.textContent="No fue posible generar el PPTX automáticamente. Descarga el PDF o intenta de nuevo con conexión a internet.";
      console.error("Error al generar PPTX:",e);
    }finally{if(button)button.disabled=false;}
  };
})();
