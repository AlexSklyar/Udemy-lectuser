const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER STRONG ATTACK';
const LOG_EVENT_MONSTER_ATTACk = 'MONSTER ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';
const MONSTER_TARGET = 'MONSTER';
const PLAYER_TARGET = 'PLAYER';



let battleLog = [];
let lastLoggedEntry;

function getMaxLifeValues() {
const enteredValue = prompt('Maximum health for u and the monster', '100')

const parsedValue = +enteredValue;
if (isNaN(parsedValue) || parsedValue<=0) {
  throw  { massage: 'Invalid user input, value not a number!' };
}
  return parsedValue;
}
let chosenMaxLife;
try {
  chosenMaxLife = getMaxLifeValues();

} catch (console) {
  console.log(error);
  chosenMaxLife = 100;
  alert('U entered something wrong, defoult value of 100 was used.');
  // throw error;
} //finally {
  
// }

  
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
      event: ev,
      value: val,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
  };

  switch (ev) { 
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = MONSTER_TARGET;
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = MONSTER_TARGET;
      break;
    case LOG_EVENT_MONSTER_ATTACk:
      logEntry.target = PLAYER_TARGET;
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = PLAYER_TARGET;
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry;
      break;
    default: logEntry = {};
}

  // if (ev === LOG_EVENT_PLAYER_ATTACK) {
  //  logEntry.target = MONSTER_TARGET;
  //   } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
  //   logEntry.target = MONSTER_TARGET;
  //  } else if (ev === LOG_EVENT_MONSTER_ATTACk) {
  //   logEntry.target = PLAYER_TARGET;
  //   } else if (ev === LOG_EVENT_PLAYER_HEAL) {
  //     logEntry.target = PLAYER_TARGET;
  //   } else if (ev === LOG_EVENT_GAME_OVER) {
  //   logEntry; 
  // }
  battleLog.push(logEntry)
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACk,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth);

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead but the bonus life saved you!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
      writeToLog(
    LOG_EVENT_GAME_OVER,
    'PLAYER WON',
    currentMonsterHealth,
    currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
      writeToLog(
    LOG_EVENT_GAME_OVER,
    'PLAYER LOST',
    currentMonsterHealth,
    currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw!');
      writeToLog(
    LOG_EVENT_GAME_OVER,
    'A DRAW',
    currentMonsterHealth,
    currentPlayerHealth);
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) { //Ternary Operator used.
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
  // if (mode === MODE_ATTACK) {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // } else if (mode === MODE_STRONG_ATTACK) {
  //   maxDamage = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(
    logEvent,
    damage,
    currentMonsterHealth,
    currentPlayerHealth);
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
   writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth);
  endRound();
}

function printLogHandler() {
  for (let i = 0; i < 3; i++) {
    console.log('__________')
  }
  // let j = 0;
  // while (j < 3) {
  //   console.log(j)
  //   j++
  // }
  // for (let i = 0; i < battleLog.length; i++){
  //   console.log(battleLog[i]);
  // }
  let i = 0;
  for (const logEntry of battleLog) {
    if (!lastLoggedEntry && lastLoggedEntry!==0 || lastLoggedEntry < i) {
      console.log(`#${i}`);
    for (const key in logEntry){
      console.log(`${key} is ${logEntry[key]}`);
      }
      lastLoggedEntry = i;
       break;
    }
    i++;
   
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);