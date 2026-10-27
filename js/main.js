(function(){
"use strict";
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const money = n => "$" + n.toFixed(2);

/* ============================================================
   1. MENU DATA  — transcribed from the printed Zaya menu
   Fields: n name · p price · pl price label · d description
           c category · gf gluten-free · s spice 0-3 · v veg option
           f flavour keys · img photo · pop guest favourite
   ============================================================ */
const IMG = {
  /* Food — from Drive zip (banner/hero kept separate) */
  banana:"images/banana.jpg",
  basilrice:"images/basil-rice.jpg",
  beef:"images/beef-salad.jpg",
  chickenkao:"images/chicken-khao-soi.jpg",
  coconut:"images/coconut-crepe.jpg",
  crab:"images/crab-fried-rice.jpg",
  crispy:"images/crispy-egg-rolls.jpg",
  crispytofu:"images/crispy-tofu.jpg",
  crying:"images/crying-tiger.jpg",
  currypuffs:"images/curry-puffs.jpg",
  eggplant:"images/eggplant-stirfry.jpg",
  fresh:"images/fresh-salad-rolls.jpg",
  green:"images/green-curry.jpg",
  tomkha:"images/tom-kha.jpg",
  lamb:"images/basil-lamb.jpg",
  larb:"images/larb.jpg",
  mangorice:"images/mango-sticky-rice.jpg",
  padthai:"images/pad-thai.jpg",
  panang:"images/panang-curry.jpg",
  papaya:"images/papaya-salad.jpg",
  pineapple:"images/pineapple-fried-rice.jpg",
  red:"images/red-curry.jpg",
  roti:"images/roti.jpg",
  salmon:"images/salmon.jpg",
  satay:"images/chicken-satay.jpg",
  shortrib:"images/short-rib.jpg",
  shrimprolls:"images/shrimp-rolls.jpg",
  stirfry:"images/basil-stirfry.jpg",
  thaicake:"images/thai-tea-cake.jpg",
  thairice:"images/thai-fried-rice.jpg",
  padsee:"images/pad-see-eiw.jpg",
  padkeemao:"images/pad-kee-mao.jpg",
  toast:"images/honey-toast.jpg",
  tomyum:"images/tom-yum.jpg",
  yellow:"images/yellow-curry.jpg",
  /* Drinks — no Drive photos; keep remote */
  mango:"https://static.spotapps.co/spots/c8/5cadd7d0a547e2880837c83fc9407c/full",
  midori:"https://static.spotapps.co/spots/94/1113615b52412d986f3ebb433aba98/full",
  thaitea:"https://static.spotapps.co/spots/da/e211d561fa4eaa8323a668007fc8b9/full",
  beehive:"https://static.spotapps.co/spots/94/039a6cb9dd484f852361d979b2a2ca/full",
  oldfash:"https://static.spotapps.co/spots/ca/2f70f1214a40768f8fff0f614aa575/full",
  beer:"https://static.spotapps.co/spots/65/5733cd01a548d0a7beaafeeb13c817/full",
  martini:"https://static.spotapps.co/spots/dc/6b106150964de4855240bc40eb6467/full",
  icedtea:"https://static.spotapps.co/spots/30/57a505f1c54195b6a56655d703f787/full"
};

const PROTEIN = "Choose vegetables, tofu, or chicken · beef +$3 · shrimp +$4 · mixed seafood +$9";

const MENUS = {
main:[
 {c:"Appetizers",n:"Zaya Platter",p:23.95,pop:1,img:IMG.crispy,d:"Crispy egg rolls, crispy calamari, crispy shrimp rolls and potato fingers with sweet chili sauce and cilantro lime aioli.",s:1,f:["salty","sweet"]},
 {c:"Appetizers",n:"Fresh Salad Rolls",p:15.95,gf:1,v:1,img:IMG.fresh,d:"Shrimp or tofu, spring mix, cucumber, carrots, mint and rice noodles wrapped in rice paper, with peanut sauce.",s:0,f:["sweet","bitter"]},
 {c:"Appetizers",n:"Crispy Calamari",p:14.95,d:"Crispy calamari served with cilantro lime aioli.",s:0,f:["salty","sour"]},
 {c:"Appetizers",n:"Basil Wings",p:14.95,gf:1,d:"Crispy chicken wings tossed in sweet basil chili sauce.",s:2,f:["spicy","sweet"]},
 {c:"Appetizers",n:"Crispy Egg Rolls",p:14.95,v:1,img:IMG.crispy,d:"Cabbage, carrots and glass noodles in an egg roll wrapper.",s:0,f:["salty"]},
 {c:"Appetizers",n:"Roti & Curry",p:13.95,v:1,img:IMG.roti,d:"Roti served with curry sauce — green, red, yellow or panang.",s:1,f:["sweet","spicy"]},
 {c:"Appetizers",n:"Tamarind Shrimp",p:18,img:IMG.shrimprolls,d:"Crispy shrimp and crispy noodles topped with onion, cilantro and tamarind sauce.",s:1,f:["sour","sweet"]},
 {c:"Appetizers",n:"Crispy Tofu",p:13.95,gf:1,v:1,img:IMG.crispytofu,d:"Fried tofu with crumbled peanuts in sweet chili sauce.",s:1,f:["sweet"]},
 {c:"Appetizers",n:"Chicken Satay",p:16.95,img:IMG.satay,d:"Marinated grilled chicken served with toast, peanut sauce and cucumber salad.",s:0,f:["salty","sweet"]},
 {c:"Appetizers",n:"Curry Puffs",p:14.95,v:1,img:IMG.currypuffs,d:"Fried puff pastry filled with marinated chicken, taro or mixed vegetables, with yellow curry sauce and cucumber salad.",s:1,f:["sweet","salty"]},
 {c:"Appetizers",n:"Crispy Shrimp Rolls",p:15.95,img:IMG.shrimprolls,d:"Fried shrimp wrapped in egg roll wrappers with sweet chili sauce.",s:1,f:["sweet","salty"]},
 {c:"Appetizers",n:"Potato Fingers",p:14.95,v:1,d:"Homemade garlic and dill potato fingers served with cilantro lime.",s:0,f:["salty","bitter"]},

 {c:"Salads",n:"Beef Salad",p:19.95,img:IMG.beef,d:"Grilled beef, mint, spring mix and onions with roasted rice and lime dressing.",s:2,f:["sour","spicy"]},
 {c:"Salads",n:"Crispy Chicken Larb",p:19.95,img:IMG.larb,d:"Crispy chicken, mint, spring mix and onions with roasted rice and lime dressing.",s:2,f:["sour","spicy"]},
 {c:"Salads",n:"Tofu Larb",p:18.95,gf:1,v:1,img:IMG.larb,d:"Crispy tofu, mint, spring mix and onions with roasted rice and lime dressing.",s:2,f:["sour","spicy"]},
 {c:"Salads",n:"Papaya Salad",p:17.95,v:1,img:IMG.papaya,d:"Green papaya, green beans, carrots, tomatoes, garlic, Thai chilis and peanuts in tamarind dressing, with rice vermicelli. Add shrimp +$5.",s:3,f:["sour","spicy"]},

 {c:"Soups",n:"Tom Kha",p:18.95,gf:1,v:1,img:IMG.tomkha,d:"Creamy coconut soup with mushrooms, tomatoes, cilantro and onions, seasoned with lemongrass and galangal. "+PROTEIN,s:1,f:["sweet","sour"]},
 {c:"Soups",n:"Tom Yum",p:18.95,gf:1,v:1,img:IMG.tomyum,d:"Thai-style hot and sour soup with mushrooms, tomatoes, cilantro and onions, seasoned with lemongrass, kaffir lime leaves and galangal. "+PROTEIN,s:3,f:["sour","spicy"]},

 {c:"Thai Street Food",n:"Basil Stir-Fry",p:17.95,gf:1,v:1,img:IMG.stirfry,d:"Basil, onions, jalapeños, garlic, bell pepper, green beans and Thai chilis, served with jasmine rice and a fried egg. "+PROTEIN,s:3,f:["spicy","salty"]},
 {c:"Thai Street Food",n:"Spicy Eggplant Stir-Fry",p:17.95,gf:1,v:1,img:IMG.eggplant,d:"Eggplant, garlic, Thai chilis, basil, bell pepper and jalapeños, served with jasmine rice and a fried egg. "+PROTEIN,s:3,f:["spicy","bitter"]},
 {c:"Thai Street Food",n:"Mixed Vegetables",p:17.95,gf:1,v:1,d:"Broccoli, spinach, carrots, mushrooms, garlic, tomatoes, green beans and onions. "+PROTEIN,s:0,f:["bitter","salty"]},
 {c:"Thai Street Food",n:"Thai Fried Rice",p:18.95,gf:1,v:1,img:IMG.thairice,d:"Eggs, onions, tomatoes and carrots, served with a fried egg. "+PROTEIN,s:0,f:["salty"]},
 {c:"Thai Street Food",n:"Basil Fried Rice",p:18.95,gf:1,v:1,img:IMG.basilrice,d:"Basil, onions, jalapeños, garlic, bell pepper and Thai chilis, served with a fried egg. "+PROTEIN,s:3,f:["spicy","salty"]},
 {c:"Thai Street Food",n:"Pineapple Fried Rice",p:18.95,gf:1,v:1,img:IMG.pineapple,d:"Pineapple, cashews, raisins, curry powder, onion and eggs. "+PROTEIN,s:0,f:["sweet","salty"]},
 {c:"Thai Street Food",n:"Pad Thai",p:18.95,gf:1,v:1,pop:1,img:IMG.padthai,d:"Thin rice noodles, eggs, bean sprouts and onions, served with crumbled peanuts. "+PROTEIN,s:0,f:["sweet","sour"]},
 {c:"Thai Street Food",n:"Pad See Eiw",p:18.95,gf:1,v:1,img:IMG.padsee,d:"Thick rice noodles, eggs, broccoli and carrots. "+PROTEIN,s:0,f:["salty","bitter"]},
 {c:"Thai Street Food",n:"Pad Kee Mao",p:18.95,gf:1,v:1,img:IMG.padkeemao,d:"Thick rice noodles, basil, Thai chilis, garlic, bell pepper, jalapeños, tomatoes, onions and carrots. "+PROTEIN,s:3,f:["spicy","salty"]},

 {c:"Curries",n:"Pumpkin Curry",p:20.95,gf:1,v:1,img:IMG.red,d:"Pumpkin, bell peppers and basil in red curry, served with jasmine rice. "+PROTEIN,s:2,f:["sweet","spicy"]},
 {c:"Curries",n:"Panang Curry",p:19.95,gf:1,v:1,img:IMG.panang,d:"Kaffir lime leaves, bell peppers and basil, served with jasmine rice. "+PROTEIN,s:2,f:["sweet","spicy"]},
 {c:"Curries",n:"Green Curry",p:19.95,gf:1,v:1,img:IMG.green,d:"Eggplant, bamboo shoots, bell pepper and basil, served with vermicelli noodles. "+PROTEIN,s:3,f:["spicy","bitter"]},
 {c:"Curries",n:"Yellow Curry",p:19.95,gf:1,v:1,img:IMG.yellow,d:"Potatoes, onions and carrots, served with jasmine rice. "+PROTEIN,s:1,f:["sweet","salty"]},
 {c:"Curries",n:"Red Curry",p:19.95,gf:1,v:1,img:IMG.red,d:"Bamboo shoots, bell peppers and basil, served with jasmine rice. "+PROTEIN,s:3,f:["spicy","sweet"]},

 {c:"Specials",n:"Short Rib Khao Soi",p:49.95,pl:"$49.95 · serves 2–3",pop:1,img:IMG.shortrib,d:"Northern Thai khao soi curry noodles with braised beef short rib, topped with crispy egg noodles and served with pickled greens, onions and chili oil.",s:2,f:["spicy","bitter"]},
 {c:"Specials",n:"Chicken Khao Soi",p:39,pl:"$39 · serves 2–3",img:IMG.chickenkao,d:"Northern Thai khao soi curry noodles with chicken quarters, topped with crispy egg noodles and served with pickled greens, onions and chili oil.",s:2,f:["spicy","bitter"]},
 {c:"Specials",n:"Salmon in Banana Leaves",p:37.95,gf:1,img:IMG.salmon,d:"Grilled Thai-marinated salmon in banana leaves with red curry sauce, served with coconut rice and cilantro lime sauce.",s:2,f:["sweet","spicy"]},
 {c:"Specials",n:"Crab Fried Rice",p:27.95,gf:1,img:IMG.crab,d:"Real crab, eggs, onions and tomato, served with cilantro lime sauce.",s:0,f:["salty","sour"]},
 {c:"Specials",n:"Braised Beef Short Rib",p:69,pl:"$69 · serves 2–3",gf:1,img:IMG.shortrib,d:"Red wine braised beef short rib with garlic rice, grilled asparagus, tamarind sauce and cilantro lime sauce.",s:0,f:["sour","salty"]},
 {c:"Specials",n:"Cowboy Ribeye",p:38.95,gf:1,img:IMG.crying,d:"Grilled 12oz ribeye with spicy smoked salt butter, curried corn and garlic rice.",s:2,f:["salty","spicy"]},
 {c:"Specials",n:"Crying Tiger",p:38.95,pop:1,img:IMG.crying,d:"Grilled Thai-marinated 12oz ribeye served with papaya salad, sticky rice and cilantro lime sauce.",s:2,f:["spicy","sour"]},
 {c:"Specials",n:"Basil Lamb",p:39.95,img:IMG.lamb,d:"Grilled rack of lamb with basil, onions, bell pepper, jalapeños, garlic, green beans and Thai chilis, served with jasmine rice.",s:3,f:["spicy","bitter"]},

 {c:"Kids",n:"Egg Fried Rice with Chicken",p:13.95,img:IMG.thairice,d:"Mild fried rice with egg and chicken.",s:0,f:["salty"]},
 {c:"Kids",n:"Chicken Satay and Rice",p:13.95,img:IMG.satay,d:"Grilled marinated chicken skewers with rice.",s:0,f:["sweet"]},
 {c:"Kids",n:"Stir-Fried Noodles with Chicken",p:13.95,img:IMG.padsee,d:"Soft noodles stir-fried with chicken.",s:0,f:["salty"]},
 {c:"Kids",n:"Crispy Chicken and Rice",p:13.95,d:"Crispy fried chicken served with rice.",s:0,f:["salty"]},

 {c:"Desserts",n:"Mango & Sticky Rice",p:15,v:1,img:IMG.mangorice,d:"Mango, sweet sticky rice and coconut cream sauce.",s:0,f:["sweet"]},
 {c:"Desserts",n:"Fried Banana with Ice Cream",p:null,pl:"Ask your server",v:1,img:IMG.banana,d:"Fried banana rolls, honey and vanilla ice cream.",s:0,f:["sweet"]},
 {c:"Desserts",n:"Sweet Roti with Fresh Fruits",p:15,v:1,img:IMG.roti,d:"Roti, condensed milk, seasonal fruit and vanilla ice cream.",s:0,f:["sweet"]}
],
lunch:[
 {c:"Lunch Special",n:"Basil Stir-fry",p:17.99,v:1,img:IMG.stirfry,d:"Basil, onions, jalapeños, garlic, bell pepper, green beans and Thai chilis over jasmine rice.",s:3,f:["spicy"]},
 {c:"Lunch Special",n:"Spicy Eggplant Stir-fry",p:17.99,v:1,img:IMG.eggplant,d:"Eggplant, garlic, Thai chilis, basil, bell pepper and jalapeños over jasmine rice.",s:3,f:["spicy","bitter"]},
 {c:"Lunch Special",n:"Pad Thai",p:17.99,v:1,pop:1,img:IMG.padthai,d:"Thin rice noodles, eggs, bean sprouts and onions.",s:0,f:["sweet","sour"]},
 {c:"Lunch Special",n:"Pad See Eiw",p:17.99,v:1,img:IMG.padsee,d:"Thick rice noodles, eggs, broccoli and carrots.",s:0,f:["salty"]},
 {c:"Lunch Special",n:"Panang Curry",p:17.99,v:1,img:IMG.panang,d:"Kaffir lime leaves, bell peppers and basil over jasmine rice.",s:2,f:["sweet","spicy"]},
 {c:"Lunch Special",n:"Green Curry",p:17.99,v:1,img:IMG.green,d:"Eggplant, bamboo shoots, bell pepper and basil over jasmine rice.",s:3,f:["spicy","bitter"]},
 {c:"Lunch Special",n:"Yellow Curry",p:17.99,v:1,img:IMG.yellow,d:"Potatoes, onions and carrots over jasmine rice.",s:1,f:["sweet"]},
 {c:"Lunch Special",n:"Red Curry",p:17.99,v:1,img:IMG.red,d:"Bamboo shoots, bell peppers and basil over jasmine rice.",s:3,f:["spicy"]}
],
catering:[
 {c:"Appetizers",n:"Fresh Salad Rolls",p:45,pl:"24 pc $45 · 48 pc $90",gf:1,v:1,img:IMG.fresh,d:"Shrimp or tofu, spring mix, cucumber, carrots, mint and rice noodles in rice paper, with peanut sauce.",s:0,f:["sweet"]},
 {c:"Appetizers",n:"Crispy Shrimp Rolls",p:45,pl:"25 pc $45 · 50 pc $90",img:IMG.shrimprolls,d:"Fried shrimp in egg roll wrappers with sweet chili sauce.",s:1,f:["sweet"]},
 {c:"Appetizers",n:"Crispy Tofu",p:45,pl:"25 pc $45 · 50 pc $90",gf:1,v:1,img:IMG.crispytofu,d:"Fried tofu with crumbled peanuts in sweet chili sauce.",s:1,f:["sweet"]},
 {c:"Appetizers",n:"Chicken Satay",p:65,pl:"25 pc $65 · 50 pc $130",img:IMG.satay,d:"Marinated grilled chicken with peanut sauce and cucumber salad.",s:0,f:["sweet","salty"]},
 {c:"Appetizers",n:"Crispy Egg Rolls",p:40,pl:"25 pc $40 · 50 pc $80",v:1,img:IMG.crispy,d:"Cabbage, carrots and glass noodles in an egg roll wrapper with sweet chili sauce.",s:0,f:["salty"]},

 {c:"Soups",n:"Tom Kha",p:70,pl:"Small tray $70 · Large $140",gf:1,v:1,img:IMG.tomkha,d:"Coconut soup with mushrooms, tomatoes and cilantro, seasoned with lemongrass and galangal.",s:1,f:["sweet","sour"]},
 {c:"Soups",n:"Tom Yum",p:70,pl:"Small tray $70 · Large $140",gf:1,v:1,img:IMG.tomyum,d:"Hot and sour soup with mushrooms, tomatoes, cilantro and onions, seasoned with lemongrass, kaffir lime leaves and galangal.",s:3,f:["sour","spicy"]},

 {c:"Entrees",n:"Basil Stir-Fry",p:85,pl:"Small tray $85 · Large $170",gf:1,v:1,img:IMG.stirfry,d:"Basil, onions, jalapeños, garlic, bell pepper, green beans and Thai chilis.",s:3,f:["spicy"]},
 {c:"Entrees",n:"Spicy Eggplant Stir-Fry",p:85,pl:"Small tray $85 · Large $170",gf:1,v:1,img:IMG.eggplant,d:"Eggplant, garlic, Thai chilis, basil, bell pepper and jalapeños.",s:3,f:["spicy","bitter"]},
 {c:"Entrees",n:"Thai Fried Rice",p:95,pl:"Small tray $95 · Large $190",gf:1,v:1,img:IMG.thairice,d:"Egg, onions, tomatoes and carrots.",s:0,f:["salty"]},
 {c:"Entrees",n:"Basil Fried Rice",p:95,pl:"Small tray $95 · Large $190",gf:1,v:1,img:IMG.basilrice,d:"Basil, onions, jalapeños, garlic, bell pepper and Thai chilis.",s:3,f:["spicy"]},
 {c:"Entrees",n:"Pad Thai",p:95,pl:"Small tray $95 · Large $190",gf:1,v:1,pop:1,img:IMG.padthai,d:"Thin rice noodles, eggs, bean sprouts and onions.",s:0,f:["sweet","sour"]},
 {c:"Entrees",n:"Pad See Eiw",p:95,pl:"Small tray $95 · Large $190",gf:1,v:1,img:IMG.padsee,d:"Thick rice noodles, eggs, broccoli and carrots.",s:0,f:["salty"]},
 {c:"Entrees",n:"Pad Kee Mao",p:95,pl:"Small tray $95 · Large $190",gf:1,v:1,img:IMG.padkeemao,d:"Thick rice noodles, basil, Thai chilis, garlic, bell pepper, jalapeños, tomatoes, onions and carrots.",s:3,f:["spicy"]},

 {c:"Curries",n:"Pumpkin Curry",p:85,pl:"Small tray $85 · Large $170",gf:1,v:1,img:IMG.red,d:"Pumpkin, bell peppers and basil in red curry sauce.",s:2,f:["sweet","spicy"]},
 {c:"Curries",n:"Green Curry",p:80,pl:"Small tray $80 · Large $160",gf:1,v:1,img:IMG.green,d:"Eggplant, bamboo shoots and basil in green curry sauce.",s:3,f:["spicy","bitter"]},
 {c:"Curries",n:"Red Curry",p:80,pl:"Small tray $80 · Large $160",gf:1,v:1,img:IMG.red,d:"Bamboo shoots, bell peppers and basil in red curry sauce.",s:3,f:["spicy"]},
 {c:"Curries",n:"Yellow Curry",p:80,pl:"Small tray $80 · Large $160",gf:1,v:1,img:IMG.yellow,d:"Potatoes, onions and carrots in yellow curry sauce.",s:1,f:["sweet"]},
 {c:"Curries",n:"Panang Curry",p:80,pl:"Small tray $80 · Large $160",gf:1,v:1,img:IMG.panang,d:"Kaffir lime leaves and bell peppers in panang curry sauce.",s:2,f:["sweet","spicy"]},

 {c:"Sides",n:"Jasmine Rice",p:20,pl:"Small tray $20 · Large $40",gf:1,v:1,d:"Steamed jasmine rice.",s:0,f:["salty"]},
 {c:"Sides",n:"Purple Rice",p:25,pl:"Small tray $25 · Large $50",gf:1,v:1,d:"Steamed purple rice.",s:0,f:["salty"]},
 {c:"Sides",n:"Coconut Rice",p:25,pl:"Small tray $25 · Large $50",gf:1,v:1,d:"Rice steamed with coconut.",s:0,f:["sweet"]},
 {c:"Sides",n:"Homemade Peanut Sauce",p:15,pl:"16 oz $15 · 32 oz $30",v:1,d:"Our peanut sauce, by the jar.",s:0,f:["sweet"]},
 {c:"Sides",n:"Homemade Chili Oil",p:15,pl:"16 oz $15 · 32 oz $30",v:1,d:"Our chili oil, by the jar.",s:3,f:["spicy"]},
 {c:"Sides",n:"Utensil Set",p:5,pl:"$5 · serves 5",d:"Plates, cutlery and napkins.",s:0,f:["salty"]}
]};

const MENU_NOTES = {
  main:"GF marks gluten-free preparations · Lunch 11:30–2:30, dinner 5:00–9:00, Wednesday to Sunday · Prices subject to change — call +1 925-567-9292 to confirm.",
  lunch:"Lunch special served Wednesday to Friday, 11:30 AM – 2:30 PM.",
  catering:"Catering orders are placed through our catering portal. Vegetarian options available across the menu."
};

/* ============================================================
   2. PRELOADER
   ============================================================ */
(function(){
  const pre=$("#pre"), bar=$("#preBar"), pct=$("#prePct");
  let v=0;
  const t=setInterval(()=>{
    v=Math.min(100, v + Math.random()*17 + 6);
    bar.style.width=v+"%"; pct.textContent=Math.floor(v);
    if(v>=100){clearInterval(t); setTimeout(done,240);}
  },130);
  function done(){
    pre.classList.add("done");
    document.body.classList.add("ready");
    $("#hero").classList.add("go");
    $("#heroTitle").classList.add("go");
  }
  setTimeout(()=>{if(!pre.classList.contains("done")){clearInterval(t);done();}},4200);
})();

/* ============================================================
   3. NAV / DRAWER / SCROLL PROGRESS / CURSOR GLOW
   ============================================================ */
(function(){
  const nav=$("#nav"), prog=$("#prog"), burger=$("#burger"), drawer=$("#drawer");
  let last=0;
  function onScroll(){
    const y=window.scrollY;
    nav.classList.toggle("solid", y>40);
    if(y>420 && y>last && !drawer.classList.contains("on")) nav.classList.add("hide");
    else nav.classList.remove("hide");
    last=y;
    const h=document.documentElement.scrollHeight-window.innerHeight;
    prog.style.width=(h>0? (y/h)*100 : 0)+"%";
  }
  addEventListener("scroll",onScroll,{passive:true}); onScroll();

  function toggle(force){
    const on = force!==undefined? force : !drawer.classList.contains("on");
    drawer.classList.toggle("on",on);
    burger.classList.toggle("on",on);
    burger.setAttribute("aria-expanded",on);
    burger.setAttribute("aria-label", on? "Close menu":"Open menu");
    document.body.classList.toggle("locked",on);
  }
  burger.addEventListener("click",()=>toggle());
  $$(".drawer a").forEach(a=>a.addEventListener("click",()=>toggle(false)));
  addEventListener("keydown",e=>{if(e.key==="Escape") toggle(false);});

  // cursor glow — desktop pointers only
  if(matchMedia("(pointer:fine)").matches && !RM){
    document.body.classList.add("has-pointer");
    const g=$("#glow"); let gx=0,gy=0,cx=0,cy=0;
    addEventListener("pointermove",e=>{gx=e.clientX;gy=e.clientY;});
    (function loop(){cx+=(gx-cx)*.09;cy+=(gy-cy)*.09;g.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;requestAnimationFrame(loop);})();
  }
})();

/* ============================================================
   4. REVEAL ON SCROLL
   Never observe .clip nodes directly — in Chromium,
   clip-path:inset(0 0 100% 0) collapses the intersection box
   to zero, so isIntersecting never fires.
   ============================================================ */
(function(){
  function reveal(el){
    if(!el || el.classList.contains("in")) return;
    el.classList.add("in");
    el.querySelectorAll(".clip:not(.in)").forEach(c=>c.classList.add("in"));
  }

  const io=new IntersectionObserver((es)=>{
    es.forEach(e=>{
      if(!e.isIntersecting) return;
      reveal(e.target);
      io.unobserve(e.target);
    });
  },{threshold:0,rootMargin:"0px 0px -5% 0px"});

  const watch=()=>{
    $$(".rv:not(.in)").forEach(el=>io.observe(el));
    $$(".clip:not(.in)").forEach(el=>{
      if(!el.closest(".rv, .reveal-host")) io.observe(el.parentElement||el);
    });
  };
  watch();
  window.__watchReveal=watch;

  const forceVisible=()=>{
    const left=$$(".rv:not(.in), .clip:not(.in)");
    if(!left.length){ removeEventListener("scroll",forceVisible); return; }
    left.forEach(el=>{
      const r=el.getBoundingClientRect();
      if(r.bottom>40 && r.top<innerHeight-40) reveal(el);
    });
  };
  addEventListener("load",()=>setTimeout(forceVisible,300));
  addEventListener("scroll",forceVisible,{passive:true});
})();

/* ============================================================
   5. HERO — embers, live open/closed status
   ============================================================ */
(function(){
  const c=$("#embers"); if(!c) return;
  if(RM){c.style.display="none";}
  else{
    const ctx=c.getContext("2d"); let w,h,parts=[];
    function size(){w=c.width=c.offsetWidth;h=c.height=c.offsetHeight;}
    function make(){return{x:Math.random()*w,y:h+Math.random()*h*.5,r:Math.random()*1.7+.4,s:Math.random()*.55+.18,a:Math.random()*.5+.12,d:Math.random()*Math.PI*2};}
    function init(){size();parts=Array.from({length:46},make);}
    function tick(){
      ctx.clearRect(0,0,w,h);
      parts.forEach(p=>{
        p.y-=p.s; p.d+=.012; p.x+=Math.sin(p.d)*.35;
        if(p.y< -12){Object.assign(p,make());p.y=h+8;}
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);
        ctx.fillStyle=`rgba(233,206,134,${p.a*(p.y/h)})`;ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    init(); tick(); addEventListener("resize",init);
  }

  // Live status, computed in Pacific Time from the real posted hours
  const SERVICE=[{o:11.5,c:14.5,n:"Lunch"},{o:17,c:21,n:"Dinner"}];
  const DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  function pacific(){
    const p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Los_Angeles",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date());
    const g=t=>p.find(x=>x.type===t).value;
    const idx=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(g("weekday"));
    return {day:idx, hrs:parseInt(g("hour"),10)+parseInt(g("minute"),10)/60};
  }
  function fmt(h){const H=Math.floor(h),M=Math.round((h-H)*60);const ap=H>=12?"PM":"AM";const hh=((H+11)%12)+1;return `${hh}:${String(M).padStart(2,"0")} ${ap}`;}
  const pills=$$(".js-status"), txts=$$(".js-status-txt");
  function update(){
    const {day,hrs}=pacific();
    const open = day!==1 && day!==2;
    let msg="", shut=true;
    if(open){
      const live=SERVICE.find(s=>hrs>=s.o&&hrs<s.c);
      if(live){shut=false;msg=`Open now · ${live.n} until ${fmt(live.c)}`;}
      else{
        const next=SERVICE.find(s=>hrs<s.o);
        msg = next ? `Closed · ${next.n} opens ${fmt(next.o)}` : (day===0 ? "Closed · reopens Wednesday at 11:30 AM" : "Closed · reopens tomorrow at 11:30 AM");
      }
    } else msg="Closed Mondays & Tuesdays · reopens Wednesday 11:30 AM";
    txts.forEach(t=>t.textContent=msg);
    pills.forEach(p=>p.classList.toggle("shut",shut));
    // highlight today's row in the hours table
    $$("#hoursList li").forEach(li=>li.classList.toggle("now", li.dataset.day==String(day)));
  }
  // hours table
  const hl=$("#hoursList");
  if(hl){
    const rows=[[1,"Monday","Closed"],[2,"Tuesday","Closed"],[3,"Wednesday","11:30–2:30 · 5:00–9:00"],
      [4,"Thursday","11:30–2:30 · 5:00–9:00"],[5,"Friday","11:30–2:30 · 5:00–9:00"],
      [6,"Saturday","11:30–2:30 · 5:00–9:00"],[0,"Sunday","11:30–2:30 · 5:00–9:00"]];
    hl.innerHTML=rows.map(r=>`<li data-day="${r[0]}"><span>${r[1]}</span><span>${r[2]}</span></li>`).join("");
  }
  update(); setInterval(update,60000);
})();

/* ============================================================
   6. TICKER
   ============================================================ */
(function(){
  const words=["Khao Soi","Pad Kee Mao","Tom Yum","Crying Tiger","Green Curry","Salmon in Banana Leaves",
    "Papaya Salad","Tamarind Shrimp","Panang","Crab Fried Rice","Basil Lamb","Mango & Sticky Rice"];
  const row=$("#tickerRow");
  const html=words.map(w=>`<span>${w}</span>`).join("");
  row.innerHTML=html+html;
})();

/* ============================================================
   7. FLAVOUR COMPASS
   ============================================================ */
(function(){
  const FL=[
    {k:"sour",  en:"Sour",   th:"เปรี้ยว", t:"Sour",   p:[1,.45,.5,.6,.3],
     d:"Lime, tamarind and green papaya. Sour is what keeps a rich plate from going heavy — it's the flavour our salads and hot-and-sour soups are built around.",
     dish:["Tom Yum","Papaya Salad","Tamarind Shrimp","Beef Salad","Crispy Chicken Larb"]},
    {k:"sweet", en:"Sweet",  th:"หวาน",   t:"Sweet",  p:[.5,1,.4,.35,.25],
     d:"Palm sugar and coconut, never sugary. Sweetness rounds the edges of chili and salt — you'll find it in the curries, the peanut sauce and every dessert.",
     dish:["Pad Thai","Pumpkin Curry","Crispy Tofu","Mango & Sticky Rice","Panang Curry"]},
    {k:"salty", en:"Salty",  th:"เค็ม",   t:"Salty",  p:[.4,.4,1,.4,.35],
     d:"Fish sauce, soy and smoked salt. Salt is the base note that makes everything else legible — it does the quiet work in our fried rices and grilled plates.",
     dish:["Thai Fried Rice","Pad See Eiw","Crab Fried Rice","Chicken Satay","Cowboy Ribeye"]},
    {k:"spicy", en:"Spicy",  th:"เผ็ด",   t:"Spicy",  p:[.55,.4,.5,1,.45],
     d:"Fresh Thai chilis, jalapeños and our own chili oil. We'll build it to your level — say mild, medium, Thai hot, or ask the kitchen to go further.",
     dish:["Pad Kee Mao","Basil Stir-Fry","Green Curry","Basil Lamb","Spicy Eggplant Stir-Fry"]},
    {k:"bitter",en:"Bitter", th:"ขม",     t:"Bitter & herbal", p:[.45,.3,.45,.5,1],
     d:"Kaffir lime leaf, galangal, Thai basil, pickled greens. The herbal register — the thing people notice in khao soi and can't quite name.",
     dish:["Short Rib Khao Soi","Mixed Vegetables","Spicy Eggplant Stir-Fry","Green Curry","Pad See Eiw"]}
  ];
  const CX=230, CY=230, R=170;
  const pt=(i,v)=>{const a=(-90+72*i)*Math.PI/180;return[CX+Math.cos(a)*R*v, CY+Math.sin(a)*R*v];};

  // rings
  $("#webRings").innerHTML=[.25,.5,.75,1].map(v=>{
    const d=FL.map((_,i)=>pt(i,v).map(n=>n.toFixed(1)).join(",")).join(" L");
    return `<path class="cmp-web" d="M${d} Z" opacity="${v===1?.9:.45}"/>`;
  }).join("");

  // nodes
  $("#cmpNodes").innerHTML=FL.map((f,i)=>{
    const [x,y]=pt(i,1);
    const oy = i===0? -26 : (i===1||i===4)? -6 : 30;
    const ty = i===0? -44 : (i===1||i===4)? -24 : 48;
    return `<g class="cmp-node" data-i="${i}" tabindex="0" role="button" aria-label="${f.en}">
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7"/>
      <text x="${x.toFixed(1)}" y="${(y+oy).toFixed(1)}">${f.en}</text>
      <text class="th" x="${x.toFixed(1)}" y="${(y+ty).toFixed(1)}">${f.th}</text>
    </g>`;
  }).join("");

  const poly=$("#cmpPoly"), big=$("#cmpBig"), sm=$("#cmpSm");
  const title=$("#cmpTitle"), desc=$("#cmpDesc"), chips=$("#cmpDishes");
  const path = p => "M" + p.map((v,i)=>pt(i,Math.max(v,.12)).map(n=>n.toFixed(1)).join(",")).join(" L") + " Z";
  poly.setAttribute("d", path([.62,.62,.62,.62,.62]));

  function pick(i){
    const f=FL[i];
    $$(".cmp-node").forEach(n=>n.classList.toggle("on", +n.dataset.i===i));
    poly.setAttribute("d", path(f.p));
    big.textContent=f.en; sm.textContent=f.th;
    title.textContent=f.t; desc.textContent=f.d;
    chips.innerHTML=f.dish.map(d=>`<button class="chip-sm" data-dish="${d}">${d}</button>`).join("");
  }
  $$(".cmp-node").forEach(n=>{
    const go=()=>pick(+n.dataset.i);
    n.addEventListener("click",go);
    n.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}});
  });
  chips.addEventListener("click",e=>{
    const b=e.target.closest("[data-dish]"); if(!b) return;
    const s=$("#menuSearch");
    document.querySelector('.tab[data-menu="main"]').click();
    s.value=b.dataset.dish; s.dispatchEvent(new Event("input"));
    $("#menu").scrollIntoView({behavior:RM?"auto":"smooth"});
  });
  pick(3);
})();

/* ============================================================
   8. MENU RENDER + FILTERS
   ============================================================ */
const Menu = (function(){
  let active="main", cat="All", q="", fGf=false, fSp=false, fVg=false;
  const grid=$("#menuGrid"), cats=$("#menuCats"), note=$("#menuNote"), search=$("#menuSearch");

  function priceLabel(it){ return it.pl || (it.p!=null? money(it.p) : "—"); }
  function heat(n){ return n? `<span class="heatmeter" title="${n} of 3 chilis" aria-label="Spice ${n} of 3">${[1,2,3].map(i=>`<b class="${i<=n?"lit":""}"></b>`).join("")}</span>` : ""; }

  function card(it,i){
    const id = active+"|"+it.c+"|"+it.n;
    return `<article class="dish" data-id="${id}" style="--i:${i}">
      ${it.img?`<img class="dish-thumb" src="${it.img}" alt="" loading="lazy" aria-hidden="true">`:""}
      <div class="dish-top">
        <h4>${it.n}</h4>
        <span class="dots"></span>
        <span class="price">${priceLabel(it)}</span>
      </div>
      <p>${it.d}</p>
      <div class="dish-tags">
        ${it.pop?'<span class="tag pop">Guest favourite</span>':""}
        ${it.gf?'<span class="tag gf">Gluten-free</span>':""}
        ${it.v?'<span class="tag">Veg option</span>':""}
        ${it.s?`<span class="tag spicy">Chili ${heat(it.s)}</span>`:""}
      </div>
    </article>`;
  }

  function list(){
    return MENUS[active].filter(it=>{
      if(cat!=="All" && it.c!==cat) return false;
      if(fGf && !it.gf) return false;
      if(fSp && (it.s||0)<2) return false;
      if(fVg && !it.v) return false;
      if(q){
        const hay=(it.n+" "+it.d+" "+it.c).toLowerCase();
        if(!q.toLowerCase().split(/\s+/).every(t=>hay.includes(t))) return false;
      }
      return true;
    });
  }

  function renderCats(){
    const list=["All",...new Set(MENUS[active].map(i=>i.c))];
    cats.innerHTML=list.map(c=>`<button class="cat${c===cat?" on":""}" data-cat="${c}">${c}</button>`).join("");
  }

  function render(){
    const items=list();
    grid.innerHTML = items.length
      ? items.map(card).join("")
      : `<div class="no-hit" style="grid-column:1/-1">Nothing matches that. Try “curry”, “noodles”, or clear the filters.</div>`;
    note.textContent=MENU_NOTES[active];
    if(window.__watchReveal) window.__watchReveal();
  }

  cats.addEventListener("click",e=>{
    const b=e.target.closest("[data-cat]"); if(!b) return;
    cat=b.dataset.cat; renderCats(); render();
  });
  $("#menuTabs").addEventListener("click",e=>{
    const b=e.target.closest("[data-menu]"); if(!b) return;
    $$("#menuTabs .tab").forEach(t=>{t.classList.remove("on");t.setAttribute("aria-selected","false");});
    b.classList.add("on"); b.setAttribute("aria-selected","true");
    active=b.dataset.menu; cat="All"; renderCats(); render();
  });
  search.addEventListener("input",()=>{q=search.value.trim(); render();});
  const tog=(el,set)=>el.addEventListener("click",()=>{el.classList.toggle("on");set(el.classList.contains("on"));render();});
  tog($("#tgGf"),v=>fGf=v); tog($("#tgSpicy"),v=>fSp=v); tog($("#tgVeg"),v=>fVg=v);

  renderCats(); render();
  return {render};
})();

/* ============================================================
   10. SHOWCASE SLIDER
   ============================================================ */
(function(){
  const slides=$$(".sc-slide"), dots=$$(".sc-dot"), count=$("#scCount");
  let i=0, timer;
  function go(k){
    i=(k+slides.length)%slides.length;
    slides.forEach((s,x)=>s.classList.toggle("on",x===i));
    dots.forEach((d,x)=>{d.classList.remove("on"); void d.offsetWidth; d.classList.toggle("on",x===i);});
    count.textContent=String(i+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");
  }
  function play(){ if(RM) return; clearInterval(timer); timer=setInterval(()=>go(i+1),6000); }
  dots.forEach(d=>d.addEventListener("click",()=>{go(+d.dataset.i);play();}));
  const sc=$("#sc");
  let sx=0;
  sc.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});
  sc.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>50){go(i+(dx<0?1:-1));play();}},{passive:true});
  go(0); play();
})();

/* ============================================================
   11. DRINKS CARDS
   ============================================================ */
(function(){
  const D=[
    {n:"Thai Martini",img:IMG.martini,d:"Clean, cold and aromatic — the one to start with before anything spicy lands."},
    {n:"Bee Hive",img:IMG.beehive,d:"Honeyed and citrus-forward. Guests keep describing our cocktails as complex; this is the one they mean."},
    {n:"Mango Cocktail",img:IMG.mango,d:"Ripe mango against a sharp backbone. Drinks like dessert, cuts like a sour."},
    {n:"Midori Sour",img:IMG.midori,d:"Bright green, properly tart, unapologetically fun."},
    {n:"Old Fashioned",img:IMG.oldfash,d:"Built the classic way, stirred long and served over one clear cube."},
    {n:"Thai Iced Tea",img:IMG.icedtea,d:"Strong black tea and condensed milk. The house answer to a plate of Thai chilis."},
    {n:"Beer Flight",img:IMG.beer,d:"Four pours, one paddle. The easy way to find what stands up to curry."}
  ];
  $("#drinkCards").innerHTML=D.map((d,i)=>`<article class="card" style="min-height:280px">
    <img class="bgi" src="${d.img}" alt="" loading="lazy" aria-hidden="true">
    <span class="num">${String(i+1).padStart(2,"0")} — From the bar</span>
    <h3>${d.n}</h3>
    <p>${d.d}</p>
  </article>`).join("");
})();

/* ============================================================
   12. GALLERY + LIGHTBOX
   ============================================================ */
(function(){
  const G=[
    [IMG.shortrib,"Short rib khao soi"],
    [IMG.padthai,"Pad Thai"],
    [IMG.green,"Green curry"],
    [IMG.crying,"Crying Tiger"],
    [IMG.salmon,"Salmon in banana leaves"],
    [IMG.mangorice,"Mango sticky rice"],
    [IMG.yellow,"Yellow curry"],
    [IMG.beef,"Beef salad"],
    [IMG.fresh,"Fresh salad rolls"],
    [IMG.panang,"Panang curry"],
    [IMG.tomyum,"Tom yum"],
    [IMG.crab,"Crab fried rice"],
    [IMG.currypuffs,"Curry puffs"],
    [IMG.satay,"Chicken satay"]
  ];
  $("#gal").innerHTML=G.map(([src,cap],i)=>
    `<a href="${src}" data-i="${i}" aria-label="Open photo: ${cap}"><img src="${src}" alt="${cap}" loading="lazy"><span class="cap">${cap}</span></a>`).join("");

  const lb=$("#lb"), img=$("#lbImg"), cap=$("#lbCap");
  document.documentElement.appendChild(lb);
  let cur=0, opener=null;
  function open(i){
    cur=(i+G.length)%G.length;
    img.src=G[cur][0]; img.alt=G[cur][1];
    cap.textContent=`${G[cur][1]} — ${String(cur+1).padStart(2,"0")} / ${G.length}`;
    lb.classList.add("on"); document.body.classList.add("locked"); $("#lbX").focus();
  }
  function close(){lb.classList.remove("on"); document.body.classList.remove("locked"); if(opener) opener.focus();}
  $("#gal").addEventListener("click",e=>{
    const a=e.target.closest("a[data-i]"); if(!a) return;
    e.preventDefault(); opener=a; open(+a.dataset.i);
  });
  $("#lbX").addEventListener("click",close);
  $("#lbP").addEventListener("click",()=>open(cur-1));
  $("#lbN").addEventListener("click",()=>open(cur+1));
  lb.addEventListener("click",e=>{if(e.target===lb) close();});
  addEventListener("keydown",e=>{
    if(!lb.classList.contains("on")) return;
    if(e.key==="Escape") close();
    if(e.key==="ArrowLeft") open(cur-1);
    if(e.key==="ArrowRight") open(cur+1);
  });
})();

/* ============================================================
   13. REVIEWS
   ============================================================ */
(function(){
  const track=$("#revTrack"), nav=$("#revNav"), n=$$(".rev").length;
  let i=0, t;
  nav.innerHTML=Array.from({length:n},(_,x)=>`<b data-i="${x}"${x===0?' class="on"':''} role="button" tabindex="0" aria-label="Review ${x+1}"></b>`).join("");
  function go(k){
    i=(k+n)%n;
    track.style.transform=`translateX(-${i*100}%)`;
    $$("#revNav b").forEach((b,x)=>b.classList.toggle("on",x===i));
  }
  function play(){ if(RM) return; clearInterval(t); t=setInterval(()=>go(i+1),7000); }
  nav.addEventListener("click",e=>{const b=e.target.closest("[data-i]"); if(b){go(+b.dataset.i);play();}});
  let sx=0;
  track.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});
  track.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-sx; if(Math.abs(d)>50){go(i+(d<0?1:-1));play();}},{passive:true});
  play();
})();

/* ============================================================
   14. NEWSLETTER + MAGNETIC BUTTONS + MISC
   ============================================================ */
(function(){
  $("#yr").textContent=new Date().getFullYear();

  const f=$("#nlForm"), em=$("#nlEmail"), msg=$("#nlMsg");
  f.addEventListener("submit",e=>{
    e.preventDefault();
    const v=em.value.trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v)){
      msg.style.color="var(--chili)";
      msg.textContent="That email doesn't look right — check it and try again.";
      em.focus(); return;
    }
    msg.style.color="var(--kaffir)";
    msg.textContent="You're on the list. We'll write when the menu changes.";
    em.value="";
    /* Wire this to your mailing platform: POST { email: v } to your endpoint. */
  });

  if(!RM && matchMedia("(pointer:fine)").matches){
    $$(".btn").forEach(b=>{
      b.addEventListener("pointermove",e=>{
        const r=b.getBoundingClientRect();
        b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.13}px, ${(e.clientY-r.top-r.height/2)*.22 - 2}px)`;
      });
      b.addEventListener("pointerleave",()=>b.style.transform="");
    });
  }

  // subtle parallax on the hero image
  if(!RM){
    const v=$("#heroImg");
    if(v) addEventListener("scroll",()=>{
      const y=window.scrollY;
      if(y<window.innerHeight){const o=Math.min(y*.14, window.innerHeight*.05);v.style.transform=`translateY(${o}px) scale(1.12)`;}
    },{passive:true});
  }

  // smooth anchor scroll with nav offset
  $$('a[href^="#"]').forEach(a=>{
    a.addEventListener("click",e=>{
      const id=a.getAttribute("href");
      if(id.length<2) return;
      const el=document.querySelector(id); if(!el) return;
      e.preventDefault();
      const top=el.getBoundingClientRect().top+window.scrollY-70;
      window.scrollTo({top,behavior:RM?"auto":"smooth"});
    });
  });
})();

})();
