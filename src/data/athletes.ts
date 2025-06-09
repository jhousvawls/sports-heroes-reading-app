export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

export interface Athlete {
  id: number;
  name: string;
  sport: string;
  image: string;
  story: string;
  questions: Question[];
}

export const athletes: Athlete[] = [
  {
    id: 1,
    name: "Patrick Mahomes",
    sport: "Football",
    image: "🏈",
    story: `Patrick Mahomes is one of the best football players in the world. He plays quarterback for the Kansas City Chiefs. A quarterback is the player who throws the football to his teammates.

Patrick was born in Texas in 1995. His dad was also a professional athlete who played baseball. Patrick loved sports from a young age. He played football, baseball, and basketball in high school.

When Patrick joined the Kansas City Chiefs, he worked very hard to become better. He practiced throwing the football every day. He studied game videos to learn how to make smart decisions.

In 2020, Patrick helped his team win the Super Bowl. The Super Bowl is the biggest football game of the year. He threw amazing passes and never gave up, even when his team was losing.

Patrick is known for being a great leader. He encourages his teammates and stays positive even when things are hard. He shows kids that with hard work and practice, you can achieve your dreams.

Off the field, Patrick helps his community. He gives money to schools and helps kids who need support. He believes in helping others and being a good role model.`,
    questions: [
      {
        id: 1,
        question: "What position does Patrick Mahomes play?",
        options: ["Running back", "Quarterback", "Wide receiver", "Kicker"],
        correct: "Quarterback",
        explanation: "Patrick is the quarterback who leads his team and throws the football to his teammates."
      },
      {
        id: 2,
        question: "What big game did Patrick help his team win in 2020?",
        options: ["World Series", "Super Bowl", "NBA Finals", "Stanley Cup"],
        correct: "Super Bowl",
        explanation: "The Super Bowl is the biggest football game of the year, and Patrick helped the Kansas City Chiefs win it in 2020."
      },
      {
        id: 3,
        question: "What does Patrick do to help his community?",
        options: ["Plays more games", "Gives money to schools", "Only focuses on football", "Moves to different cities"],
        correct: "Gives money to schools",
        explanation: "Patrick helps his community by giving money to schools and supporting kids who need help."
      }
    ]
  },
  {
    id: 2,
    name: "Serena Williams",
    sport: "Tennis",
    image: "🎾",
    story: `Serena Williams is one of the greatest tennis players of all time. She has won more tennis matches than almost any other player in history.

Serena was born in Michigan in 1981. When she was young, her family moved to California. Her dad taught her and her sister Venus how to play tennis on public courts. They didn't have a lot of money, but they had big dreams.

Serena started playing professional tennis when she was just 14 years old. She was very young, but she was also very talented and worked extremely hard. She practiced for hours every day.

Throughout her career, Serena won 23 Grand Slam tournaments. Grand Slams are the most important tennis competitions in the world. She won more Grand Slams than any other player in the modern era.

What makes Serena special is her determination. Even when she was losing a match, she never gave up. She would fight back and often win games that seemed impossible. She showed that believing in yourself is very important.

Serena also became a mom while still playing tennis. She proved that women can be great athletes and great mothers at the same time. She inspires girls everywhere to follow their dreams.`,
    questions: [
      {
        id: 1,
        question: "How many Grand Slam tournaments did Serena Williams win?",
        options: ["20", "21", "23", "25"],
        correct: "23",
        explanation: "Serena won 23 Grand Slam tournaments, which is more than any other player in the modern era."
      },
      {
        id: 2,
        question: "How old was Serena when she started playing professional tennis?",
        options: ["12", "14", "16", "18"],
        correct: "14",
        explanation: "Serena was very young when she started her professional career at just 14 years old."
      },
      {
        id: 3,
        question: "What important lesson does Serena teach us?",
        options: ["Only talent matters", "Give up when losing", "Never give up and believe in yourself", "Money is most important"],
        correct: "Never give up and believe in yourself",
        explanation: "Serena showed that determination and believing in yourself can help you overcome any challenge."
      }
    ]
  },
  {
    id: 3,
    name: "LeBron James",
    sport: "Basketball",
    image: "🏀",
    story: `LeBron James is one of the best basketball players ever. He is known for his incredible skills and his big heart for helping others.

LeBron was born in Ohio in 1984. He grew up in a poor family with just his mom. Life was hard, but his mom worked very hard to take care of him. Basketball became LeBron's way to have fun and stay out of trouble.

In high school, LeBron was already amazing at basketball. People came from all over to watch him play. When he was 18, he went straight from high school to play in the NBA, which is very rare.

LeBron has played for three different NBA teams: the Cleveland Cavaliers, Miami Heat, and Los Angeles Lakers. He won championships with all three teams. This shows how good he is at working with different teammates.

What makes LeBron special is not just his basketball skills, but how he helps his community. He opened a school in his hometown for kids who need extra help. He pays for kids to go to college. He believes education is very important.

LeBron shows us that success means helping others. Even though he is famous and rich, he remembers where he came from and helps kids who are in situations like he was.`,
    questions: [
      {
        id: 1,
        question: "How many different NBA teams has LeBron played for?",
        options: ["Two", "Three", "Four", "Five"],
        correct: "Three",
        explanation: "LeBron has played for three NBA teams: the Cleveland Cavaliers, Miami Heat, and Los Angeles Lakers."
      },
      {
        id: 2,
        question: "What did LeBron do to help kids in his hometown?",
        options: ["Built a playground", "Opened a school", "Started a sports team", "Made a movie"],
        correct: "Opened a school",
        explanation: "LeBron opened a school in his hometown to help kids who need extra support with their education."
      },
      {
        id: 3,
        question: "How old was LeBron when he joined the NBA?",
        options: ["17", "18", "19", "20"],
        correct: "18",
        explanation: "LeBron went straight from high school to the NBA when he was 18 years old, which is very rare."
      }
    ]
  }
];
