// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  const pAeqourFactory = (specimenNum, dna) => {
    return {
      specimenNum: specimenNum,
      dna: dna,
      mutate: function() {
        let viableDnaBases = [];
        let randomIndex = Math.floor(Math.random() * 15);
        let mutatedDna = this.dna[randomIndex];
      switch (mutatedDna){
        case 'A':
          viableDnaBases = ['T', 'C', 'G'];
          mutatedDna = viableDnaBases[Math.floor(Math.random() * 3)];
          this.dna[randomIndex] = mutatedDna;
          return this.dna;
        case 'T':
          viableDnaBases = ['A', 'C', 'G'];
          mutatedDna = viableDnaBases[Math.floor(Math.random() * 3)];
          this.dna[randomIndex] = mutatedDna;
          return this.dna;
        case 'C':
          viableDnaBases = ['A', 'T', 'G'];
          mutatedDna = viableDnaBases[Math.floor(Math.random() * 3)];
          this.dna[randomIndex] = mutatedDna;
          return this.dna;
        case 'G':
          viableDnaBases = ['A', 'T', 'C'];
          mutatedDna = viableDnaBases[Math.floor(Math.random() * 3)];
          this.dna[randomIndex] = mutatedDna;
          return this.dna;
      }
      },
      compareDNA: function(pAequor) {
        let identicalBases = 0;
        for(let i = 0; i < this.dna.length; i++){
          if(this.dna[i] === pAequor.dna[i]){
            identicalBases += 1;
          }
        }
        let percentage = ((identicalBases / 15) * 100).toFixed(2);
        return (`specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentage} DNA in common`);
      
      },
      willLikelySurvive: function() {
        let cBases = 0;
        let gBases = 0;
        for(let i = 0; i < this.dna.length; i++){
            if(this.dna[i] === 'C'){
              cBases += 1;
            }else if(this.dna[i] === 'G'){
              gBases += 1;
            }
            if(gBases === ((60 * 15) / 100) || cBases === ((60 * 15) / 100)){
            return true;
          }
        }
        return false;
        },
      complementStrand: function(){
        let complementDna = [];
        this.dna.forEach(base => {
          switch (base) {
            case 'A':
              base = 'T';
              complementDna.push(base);
              break;
            case 'T':
              base = 'A';
              complementDna.push(base);
              break;
            case 'C':
              base = 'G';
              complementDna.push(base);
              break;
            case 'G':
              base = 'C';
              complementDna.push(base);
              break;
        }
        });
        return complementDna;
      }
      }
    };
  function pAequorsList(pAequorNum){
    let arrToStudy = [];
    let tryNum = 0;
    while(arrToStudy.length < pAequorNum){
      tryNum += 1;
      let pAequor = pAeqourFactory(tryNum, mockUpStrand());
      if(pAequor.willLikelySurvive() === true){
        arrToStudy.push(pAequor);
      }
    }
    return arrToStudy;
  }

/*
Use the compareDNA() method to find the two most related instances of pAequor.
 */

function similarOrganisms(arr){
  if(arr.length < 2){
    return 'Error! This function requires at least two organisms to compare';
  }
  let bestMatchOr1;
  let bestMatchOr2;
  let bestMatchPer = 0;
    for(let i = 0; i < arr.length; i++){
      for(let j = 0; j < arr.length; j++){

      if(arr[j].specimenNum !== arr[i].specimenNum){
          let percentageArr = arr[i].compareDNA(arr[j]).split(' ');
          let percentage = percentageArr[percentageArr.length - 4];
          if(percentage > bestMatchPer){
            bestMatchPer = percentage;
            bestMatchOr1 = arr[i].specimenNum;
            bestMatchOr2 = arr[j].specimenNum;
          }
        }
      }
    }
    return `The most related pAequors are: ${bestMatchOr1} and ${bestMatchOr2} with ${bestMatchPer}% similar DNA bases`;
}
