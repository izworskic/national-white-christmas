(function(){
  const nodes=document.querySelectorAll("[data-wc-season-copy]");
  if(!nodes.length)return;
  const now=new Date(Date.now()),base=now.getUTCFullYear(),year=base+(now.getTime()>Date.UTC(base,11,25,23,59,59,999)?1:0);
  const target=new Date(Date.UTC(year,11,25,12));
  const nov1=new Date(Date.UTC(year,10,1)),dec10=new Date(Date.UTC(year,11,10)),dec19=new Date(Date.UTC(year,11,19)),dec25=new Date(Date.UTC(year,11,25));
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
  }else if(now.getUTCFullYear()===year&&now.getUTCMonth()===11&&now.getUTCDate()===25){
    label="Christmas Day";
    copy="Use the latest observed snow depth and local forecast conditions for the final answer.";
  }else{
    label="Season complete";
    copy="Christmas "+year+" has passed. Check local observations before planning the next Christmas cycle.";
  }
  nodes.forEach(node=>{
    const place=node.getAttribute("data-wc-place");
    const prefix=place?place+": ":"";
    node.innerHTML="<strong>"+prefix+label+(now<dec25?" · "+days+" days to Christmas":"")+":</strong> "+copy;
  });
})();
