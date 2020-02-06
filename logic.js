// import { object } from "joi";

// let str="I'm very bad person in this world. kindly stay far away."
// console.log(str);
// let reverstr="";
// for (let i = str.length-1; i >=0; i--) {
//     reverstr=reverstr+str.charAt(i)    
// }
// console.log(reverstr);

// let words=str.split(" ");
// let reverstr1="";

// for(let i=0; i<words.length;i++){
//     let word=words[i]
//     let reverse=""
//     for(let j=word.length-1;j>=0;j--){
//         reverse=reverse+word.charAt(j)
//     }
//     reverstr1=reverstr1+reverse+" "
// }
// console.log(reverstr1);

// let str="I'm very bad person in this world. kindly stay far away."
// let words=str.split(' ')
// let line=""
// for(let i=0; i<8; i++)
// {
//      line=line+str.charAt(i)
//      console.log(line);
     
// }
// console.log(line);

// let a=['sam','Amma','Appa','anna','manju','Super']
// console.log('sort -->',a.sort());
// console.log(a);
// console.log(a);
// console.log(a.push('ananf'));
// a[4]='manju'
// a[5]='manju..'
// console.log(Array.isArray(a));
// a.unshift('per')

// console.log(a.length);
// for (const iterator of a) {
//     console.log(iterator);    
// }

// console.log(a.slice(0,2));
// console.log(a.sort());

// let array=[10,7,0,9,6,2,8]
// console.log(array);
// for(let i=0; i<array.length;i++)
// {
//     for(let j=i+1; j<array.length; j++){
//         if(array[i]>array[j]){
//             temp = array[i];
//             array[i] = array[j];
//             array[j] = temp;
//         }
//     }
// }
// console.log(array);

// let arrays=[10,7,0,9,6,2,8,0]
// console.log(arrays);
// for (let i=0; i<arrays.length;i++){
//     for(let j=i+1;j<arrays.length;j++){
//         if(arrays[j]<arrays[i]){
//             temp=arrays[i]
//             arrays[i]=arrays[j]
//             arrays[j]=temp
//         }
//     }
// }

// console.log(arrays);

// let str="im manju hubballi from mugalkhod"
// console.log(str);
// let disp=""
// for(let i=str.length;i>=0;i--){
//     disp=disp+str.charAt(i)
// }
// console.log(disp);

// let wording=str.split(" ")
// let reverz=""
// for(let i=0;i<wording.length;i++){
//     let wordz=wording[i];
//     let rev="";
//     for(let j=wordz.length-1;j>=0;j--){
//         rev=rev+wordz.charAt(j)
//     }
//     reverz=reverz+rev+" "
// }
// console.log(reverz);

let sort=[10,16,33,0,5,99]

for(let i=0;i<sort.length;i++){
    for (let j=i+1;j<sort.length;j++){
        if(sort[i]>sort[j]){
            temp=sort[i]
            sort[i]=sort[j]
            sort[j]=temp
        }
    }
}
console.log(sort);

console.log("-----------Rever string start--------");
let s="I am going to collage"
console.log(s);
 let b="";
for(let i=s.length-1;i>=0;i--){
    b=b+s.charAt(i)
}
console.log(b);
console.log("-----------Rever string End--------");

console.log("-----------Rever Words in string start--------");
let s1="I am going to collage"
words=s1.split(' ')
console.log(s);
 let c="";
for(let i=0;i<words.length;i++){
    let word=words[i]
    let reverse="";
    for(let j=word.length-1;j>=0;j--){
        reverse=reverse+word.charAt(j)
    }
    c=c+reverse+" "
}
console.log(c);

console.log("-----------Rever Words in string End--------");