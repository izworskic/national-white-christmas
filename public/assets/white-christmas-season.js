(function(){
  const nodes=document.querySelectorAll("[data-wc-season-copy]");
  if(!nodes.length)return;
  const now=new Date(),year=2026,target=new Date(year,11,25,12,0,0);
  const nov1=new Date(year,10,1),dec10=new Date(year,11,10),dec19=new Date(year,11,19),dec25=new Date(year,11,25);
  const days=Math.max(0,Math.ceil((target-now)/86400000));
  let label,copy;
  if(now<nov1){
    label="Early outlook";
    copy="Historical Christmas snow odds are the useful signal now. A specific December 25 forecast would be false precision.";
  }else if(now<dec10){
    label="Seasonal setup";
    copy="Broad temperature patterns and the first durable snowpack now add context, but Christmas Day is still outside a dependable short-range forecast.";
  }else if(now<dec19){
    label="Snowpack watch";
    copy="Actual snow on the ground now matters much more. Watch whether cold preserves the pack or rain and warmth cut into it.";
  }else if(now<dec25){
    label="Forecast window";
    copy="Christmas is close enough for the short-range forecast to drive the answer. Snowfall, rain, highs, lows and existing snow depth matter most now.";
  }else if(now.getFullYear()===year&&now.getMonth()===11&&now.getDate()===25){
    label="Christmas Day";
    copy="Use the latest observed snow depth and local forecast conditions for the final answer.";
  }else{
    label="Season complete";
    copy="Christmas 2026 has passed. The live estimator will roll into the next Christmas cycle.";
  }
  nodes.forEach(node=>{
    const place=node.getAttribute("data-wc-place");
    const prefix=place?place+": ":"";
    node.innerHTML="<strong>"+prefix+label+(now<dec25?" · "+days+" days to Christmas":"")+":</strong> "+copy;
  });
})();
