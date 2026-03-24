// OPENPROCESSING IS REQUIRED: Created for Sinan Ascioglu
// CREATED BY MikeMcl for Decimal.js

(async function(){
const src="https://cdn.jsdelivr.net/gh/MikeMcl/decimal.js/decimal.js";
const res=await fetch(src);
const txt=await res.text();
const script=new Function(txt+";return Decimal;");
const Decimal=script();

const MAX=new Decimal("9e15");

function repeatOmega(n){
let s="";
for(let i=0;i<n;i++) s+="Ω+";
return s.replace(/\+$/,"");
}

function parseOrdinal(input){
input=input.trim();
if(/^Ω\.repeat\((\d+)\)$/.test(input)){
const n=parseInt(input.match(/^Ω\.repeat\((\d+)\)$/)[1]);
return repeatOmega(n);
}
if(/^ω(\+ω)*\+$/.test(input)) return input;
if(/^ε\+$/.test(input)) return input;
if(/^ζ\+$/.test(input)) return input;
if(/^Γ\+$/.test(input)) return input;
if(/^Ω\+$/.test(input)) return input;
throw new Error("OrdinalError: Unexpected type NaN");
}

function pow(base,exp){
base=new Decimal(base);
exp=new Decimal(exp);
if(!base.isFinite()||!exp.isFinite()) throw new Error("OrdinalError: NaN is not defined.");
const r=Decimal.pow(base,exp);
if(r.gt(MAX)) throw new Error("OrdinalError: Number exceeded the limit because the range is Infinity.");
return r;
}

function omegaPlus(n){
let r="ω";
for(let i=0;i<n;i++) r+="+";
return r;
}

function epsilonPlus(){return "ε+";}
function zetaPlus(){return "ζ+";}
function gammaPlus(){return "Γ+";}
function omegaBigPlus(){return "Ω+";}

const OrdinalJS={
Decimal:Decimal,
parse:parseOrdinal,
pow:pow,
omegaPlus:omegaPlus,
epsilonPlus:epsilonPlus,
zetaPlus:zetaPlus,
gammaPlus:gammaPlus,
omegaBigPlus:omegaBigPlus,
repeatOmega:repeatOmega,
MAX:MAX
};

if(typeof module!=="undefined") module.exports=OrdinalJS;
else self.OrdinalJS=OrdinalJS;
})();
