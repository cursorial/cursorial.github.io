var supports = {
  "Soraka": [
    ["Tahm Kench", "Bard", "Karma", "Sona", "Zilean", "Lulu", "Draven", "Sion"],
    ["Varus", "Vayne", "Ezreal", "Kog Maw"]],
  "Braum": [
    ["Blitzcrank", "Nautilus", "Leona", "Caitlyn", "Lucian", "Miss Fortune"],
    ["Ezreal", "Twitch", "Lucian", "Ashe", "Kalista"]],
  "Karma": [
    ["Braum", "Bard", "Taric", "Trundle", "Tahm Kench", "Alistar", "Zilean", "Malzahar", "Jinx", "Twitch", "Ashe"],
    [""]],
  "Thresh": [
    ["Sona", "Blitzcrank", "Leona", "Soraka", "Draven", "Vel'Koz"],
    [""]],
  "Sona": [
    ["Janna", "Trundle", "Karma", "Sion", "Taric", "Lulu", "Braum", "Leona", "Tahm Kench", "Nautilus", "Bard", "Vayne", "Twitch"],
    ["Ezreal", "Caitlyn"]],
  "Vel'Koz": [
    ["Taric", "Braum", "Leona", "Alistar", "Janna", "Brand", "Malzahar", "Karma"],
    []],
  "Malzahar": [
    ["Braum", "Bard", "Nautilus", "Varus", "Morgana", "Tahm Kench", "Nami"],
    []],
  "Sion": [
    ["Braum", "Thresh", "Trundle", "Nautilus", "Blitzcrank", "Taric", "Alistar", "Leona"],
    ["Jhin"]],
  "Trundle": [
    ["Braum", "Nautilus", "Blitzcrank", "Taric", "Jhin", "Varus"],
    ["Ashe", "Varus"]],
  "Morgana": [
    ["Thresh", "Alistar", "Braum", "Leona", "Taric", "Ashe", "Draven", "Corki"],
    ["Ziggs", "Miss Fortune", "Ashe", "Varus"]],
  "Leona": [
    ["Blitzcrank", "Soraka", "Twitch", "Caitlyn", "Kalista"],
    ["Miss Fortune", "Sivir", "Jhin"]],
  "Tahm Kench": [
    ["Morgana", "Braum", "Leona", "Thresh", "Nautilus"],
    ["Jinx", "Jhin", "Miss Fortune", "Ashe"]],
  "Janna": [
    ["Bard", "Alistar", "Leona", "Lulu", "Zilean", "Lux", "Lucian", "Tristana", "Corki", "Sivir"],
    ["Draven", "Varus", "Vayne", "Miss Fortune", "Ashe"]],
  "Zyra": [
    ["Braum", "Tahm Kench", "Leona", "Taric", "Zilean", "Bard", "Sion", "Vayne", "Draven", "Lucian"],
    ["Tristana", "Twitch", "Jhin", "Draven", "Miss Fortune", "Ashe"]],
  "Alistar": [
    ["Blitzcrank", "Leona", "Nautilus", "Twitch", "Lucian", "Caitlyn"],
    ["Twitch", "Miss Fortune", "Vayne", "Jhin"]],
  "Blitzcrank": [
    ["Janna", "Nami", "Bard", "Zyra", "Lux", "Vel'Koz", "Soraka", "Twitch", "Kog'Maw", "Ashe", "Caitlyn"],
    ["Varus", "Ashe", "Ziggs", "Miss Fortune", "Jinx", "Jhin"]],
  "Lulu": [
    ["Alistar", "Nautilus", "Braum", "Leona", "Tahm Kench", "Taric", "Bard", "Lucian", "Ezreal", "Draven"],
    ["Draven", "Varus", "Kog Maw"]],
  "Nami": [
    ["Tahm Kench", "Sion", "Taric", "Lulu", "Janna", "Leona", "Brand", "Braum", "Thresh", "Ezreal", "Kalista", "Tristana", "Caitlyn"],
    ["Ziggs", "Corki", "Ezreal", "Sivir", "Vayne"]],
  "Bard": [
    ["Braum", "Nautilus", "Taric", "Alistar"],
    []],
  "Taric": [
    ["Thresh", "Blitzcrank"],
    []],
  "Nautilus": [
    ["Thresh", "Blitzcrank"],
    []],
  "Zilean": [
    ["Malzahar", "Lulu", "Nami", "Thresh", "Alistar", "Blitzcrank", "Lucian", "Ashe", "Jinx", "Vayne"],
    ["Twitch", "Caitlyn", "Ezreal", "Vayne"]]
};

function getBestSupport(enemySupport, enemyAdc, alliedAdc) {
  var bestScore = 0;
  var bestSupp = [];
  for(support in supports) {
    if(support != enemySupport) {
      var currentSupp = supports[support];
      var score = 0;
      if(currentSupp[0].indexOf(enemySupport) > -1) {
        score++;
      }
      if(currentSupp[0].indexOf(enemyAdc) > -1) {
        score++;
      }
      if(currentSupp[1].indexOf(alliedAdc) > -1) {
        score ++;
      }
      bestSupp.push({name: support, score: score});
    }
  }
  return bestSupp;
}

function formChanged() {
  var enemySupport = document.getElementById('enemySupport').value;
  var enemyAdc = document.getElementById('enemyAdc').value;
  var alliedAdc = document.getElementById('alliedAdc').value;

  var bestSupport = getBestSupport(enemySupport, enemyAdc, alliedAdc);
  var outstring = "";
  bestSupport.sort(function(a, b) {
    return a.score > b.score;
  });
  for(var i = 0; i < bestSupport.length; i++) {
    outstring += "<p>" + bestSupport[i].name + ' : ' + bestSupport[i].score + '</p>';
  }
  document.getElementById('result').innerHTML = outstring;
}
