const fs = require('fs');

const getTeamsData = filename => {
  const unparsedArr = fs
  .readFileSync(`${filename}.in`, 'ascii')
  .split("\n")
  .filter(el => {
    const numberPattern = /\d+/gim;
    return numberPattern.test(el);
  }).map(el => el.split(" "));
  const numOfTeam = unparsedArr.shift()[0];
  const teams = [];
  for(let i=0; i<numOfTeam; i=i+1){
    const generalInfo = unparsedArr.shift();
    const ranks = unparsedArr.shift();
    teams.push({
      numOfPlayers: Number(generalInfo[0]),
      teamSize: Number(generalInfo[1]),
      rankings: [...ranks].map(el => Number(el)).sort((a,b) => a-b)
    });
  }
  return teams;
}

const getMinPracticeTime = teamData => {
  const teamSize = teamData.teamSize;
  const numOfPlayers = teamData.numOfPlayers;
  const rankings = teamData.rankings;
  let minPracticeTime = 0;
  for(let i=1; i<numOfPlayers; i++){
    let currDiff = rankings[i]-rankings[i-1];
    if(i<teamSize){
      minPracticeTime += currDiff*i;
    } else {
      const oldMemberRank = rankings[i-teamSize];
      const newMemberRank = rankings[i-1];
      let newPracTime = minPracticeTime-(newMemberRank-oldMemberRank)+(currDiff*(teamSize-1));
      minPracticeTime = newPracTime < minPracticeTime ? newPracTime : minPracticeTime;
    }
  }
  return minPracticeTime;
}


const results = getTeamsData("example").map(getMinPracticeTime);
results.forEach((res, ind) => console.log(`Case #${ind+1}: ${res}`));