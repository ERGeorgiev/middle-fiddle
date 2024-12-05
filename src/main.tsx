import {Devvit} from '@devvit/public-api'

type PageProps = {
  setPage: (page: string) => void;
}

const words3 = ["act","add","aim","bow","buy","can","cat","dig","dip","fan","fit","fix","fly","get","gig","hey","hop","hug","hum","ink","jam","joy","kid","lay","let","lit","mix","mop","nod","opt","pat","pet","pop","rap","row","rub","run","say","see","set","sip","sit","ski","spy","sum","sun","tap","tag","tie","tip","top","try","tug","use","van","vet","wag","wax","web","win","wow","yay","zip","zap","zoo"];

const words4 = ["abet","aide","ally","bake","beam","calm","care","clap","cook","dare","dive","draw","echo","emit","face","find","fish","fold","fuel","gain","gift","give","glow","grow","heal","help","hope","hike","join","jump","kiss","knit","land","lift","like","link","live","look","love","make","meet","mind","move","note","open","pack","play","pull","push","read","rest","rise","rock","save","send","sing","skip","spin","stay","talk","tend","tidy","tour","trim","turn","walk","wave","wear","wish","work","wrap","yawn","yell","zoom"];

const words5 = ["adapt","admit","adore","agree","align","amuse","apply","argue","arise","bathe","begin","blink","bless","bring","build","cheer","clean","climb","color","craft","crave","dance","dream","drink","enjoy","enter","equip","fetch","field","focus","found","frame","glide","glint","greet","guard","guide","habit","hatch","honor","hover","laugh","learn","light","liven","merge","match","mimic","mount","nurse","offer","paint","pause","plant","place","prize","reach","reign","relax","renew","reply","reset","roast","shine","share","shift","smile","solve","speak","spend","stand","start","thank","toast","trade","train","treat","trust","value","visit","voice","vouch","whirl","write"];

const words6 = ["accept","admire","advise","affirm","always","answer","assist","aspire","attend","baking","become","better","bounce","breeze","bright","builds","calmed","caring","change","choose","collab","create","decide","deduce","defend","direct","donate","emerge","enable","endure","enrich","escape","exceed","expand","expect","extend","foster","friend","giggle","honors","ignite","impact","intend","invite","laughs","listen","loving","mentor","offers","pledge","polish","repair","saving","select","social","soothe","spread","stroll","strive","uplift","voiced","wonder","youths"];

const words7 = 
["advance","appoint","approve","arrange","assists","attract","believe","cherish","clarify","comfort","dazzled","develop","deliver","empower","explore","express","forgive","glisten","inspire","involve","improve","journey","learned","lovable","migrate","nurture","observe","promise","provide","protect","refresh","rejoice","respect","succeed","support","venture","vibrant","welcome","witness","whisper"];

const words8 = ["activate","appraise","comforts","consider","continue","decorate","envision","generate","gracious","innovate","motivate","organize","preserve","recreate","simplify","validate","vitalize","widening","defining","honoring","multiply","preserve","striving","thriving"];

const words9 = ["calculate","celebrate","cultivate","enlighten","encourage","expanding","exploring","fascinate","integrate","promoting","replenish","repeating","transform","wholesome","inspiring","uplifting","elevating","advancing","believing","fostering"];

const words10 = ["appreciate","contribute","coordinate","enthusiast","facilitate","graciously","illuminate","innovative","liberating","motivating","organizing","preserving","rejuvenate","reputation","revolution","simplified","strengthen","sustaining","vitalizing","reflecting","nourishing","empowering","clarifying","optimizing","surpassing","completing"];

const letters = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
  "u", "v", "w", "x", "y", "z"
];

let startTime = Date.now();
let score = 0;
let level = 1;
let title = "Middle Fiddle"
let subtitle = ""

Devvit.addCustomPostType({
  name: 'Name',
  render: context => {
    const { useState } = context;
    const [page, setPage] = useState("play");
    const [targetLetter, setTargetLetter] = useState(letters[Math.floor(Math.random()*letters.length)]);
    const [currentWord, setCurrentWord] = useState(words3[Math.floor(Math.random()*words3.length)]);

    const PageGame = () => (
      <vstack
        width="100%"
        height="100%"
        alignment="middle center"
        gap="large"
      >
        <text size="xxlarge"></text>
        <text size="xlarge">Select closest letter to:</text>
        <text size="xxlarge" weight="bold" height="32px">' {targetLetter} '</text>
        <LetterSelector />
        <text size="small">(in alphabetical order)</text>
      </vstack>
    );
    
    const PageEnd = ({ setPage }: PageProps) => (
      <vstack
        width="100%"
        height="100%"
        alignment="middle center"
        gap="large"
      >
        <text size="xxlarge">{title}</text>
        <text size="xxlarge">{subtitle}</text>
        <button onPress={() => { setPage('play'); }}>Play</button>
      </vstack>
    );

    const LetterSelector = () => (
      <hstack width="100%" alignment="center">
        <hstack grow={false}>
          {currentWord.split('').map((letter, index) => (
            <hstack
              height={`36px`}
              width={`28px`}
              onPress={() => chooseLetter(letter)}
              alignment="middle center"
            >
              <text
                color="#D93A00"
                weight="bold"
                size="xxlarge"
              >
                {`${letter}`}
              </text>
            </hstack>
          ))}
        </hstack>
      </hstack>
    );
    
    function chooseLetter(chosenLetter: string): void {
      let chosenDistance = Math.abs(letters.indexOf(targetLetter) - letters.indexOf(chosenLetter));
      let currentWordLetters = currentWord.split('');
      let targetDistance = 100;
      for (let i = 0; i < currentWordLetters.length; i++) {
        let letter = currentWordLetters[i]
        let letterDistance = Math.abs(letters.indexOf(targetLetter) - letters.indexOf(letter));
        if (letterDistance < targetDistance) {
          targetDistance = letterDistance
        }
      }
      
      if (chosenDistance <= targetDistance) {
        if (level == 1) {
          startTime = Date.now();
        }
        level++;
        if (level <= 8) {
          setPage("play");
        }
        else {
          level = 1; 
          score = Date.now() - startTime;
          let seconds = score / 1000;
          title = "🎉 Victory! 🎉";
          subtitle = "Time: " + seconds + "s"
          setPage("end");
        }
      }
      else {
        level = 1;
        title = "Game Over! 💔"
        subtitle = ""
        setPage("end");
      }
      
      setTargetLetter(letters[Math.floor(Math.random()*letters.length)]);
      switch (level) {
        case 1:
          setCurrentWord(words3[Math.floor(Math.random()*words3.length)]);
          break;
        case 2:
          setCurrentWord(words4[Math.floor(Math.random()*words4.length)]);
          break;
        case 3:
          setCurrentWord(words5[Math.floor(Math.random()*words5.length)]);
          break;
        case 4:
          setCurrentWord(words6[Math.floor(Math.random()*words6.length)]);
          break;
        case 5:
          setCurrentWord(words7[Math.floor(Math.random()*words7.length)]);
          break;
        case 6:
          setCurrentWord(words8[Math.floor(Math.random()*words8.length)]);
          break;
        case 7:
          setCurrentWord(words9[Math.floor(Math.random()*words9.length)]);
          break;
        case 8:
          setCurrentWord(words10[Math.floor(Math.random()*words10.length)]);
          break;
        default:
          break;
      }
    }

    let currentPage;
    switch (page) {
      case "play":
        currentPage = <PageGame />;
        break;
      default:
        currentPage = <PageEnd setPage={setPage} />;
        break;
    }
    
    return (
      <blocks>
        {currentPage}
      </blocks>
    )
  }
})

export default Devvit