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
  },
  {
    id: 4,
    name: "Simone Biles",
    sport: "Gymnastics",
    image: "🤸‍♀️",
    story: `Simone Biles is the greatest gymnast of all time. She can do amazing flips and jumps that seem impossible to most people.

Simone was born in Ohio in 1997. When she was young, her life was difficult. Her birth mother couldn't take care of her, so her grandparents adopted her and her sister. Her grandparents became her mom and dad and gave her lots of love.

Simone discovered gymnastics when she was 6 years old during a field trip. She was naturally good at flipping and jumping. Her coaches saw that she had special talent and encouraged her to keep practicing.

Simone worked incredibly hard. She practiced gymnastics for many hours every day. She learned to do moves that were so difficult, some of them are named after her! When a gymnast creates a new move, it gets their name.

At the Olympics, Simone won many gold medals. She became famous around the world for her amazing skills. But she also became famous for something else - speaking up about mental health.

Simone taught everyone that it's okay to take care of your mind, not just your body. She showed that even the strongest athletes need to rest and take care of themselves. She is brave both in gymnastics and in life.`,
    questions: [
      {
        id: 1,
        question: "How old was Simone when she discovered gymnastics?",
        options: ["4", "6", "8", "10"],
        correct: "6",
        explanation: "Simone discovered gymnastics when she was 6 years old during a school field trip."
      },
      {
        id: 2,
        question: "What makes some of Simone's gymnastics moves special?",
        options: ["They are easy to do", "They are named after her", "She learned them quickly", "They don't require practice"],
        correct: "They are named after her",
        explanation: "Some of Simone's moves are so difficult and unique that they are officially named after her in gymnastics."
      },
      {
        id: 3,
        question: "What important lesson did Simone teach about mental health?",
        options: ["Ignore your feelings", "Only focus on winning", "It's okay to take care of your mind", "Mental health doesn't matter"],
        correct: "It's okay to take care of your mind",
        explanation: "Simone showed that taking care of your mental health is just as important as taking care of your body."
      }
    ]
  },
  {
    id: 5,
    name: "Lionel Messi",
    sport: "Soccer",
    image: "⚽",
    story: `Lionel Messi is one of the best soccer players in the world. He is small in size but has huge talent and an even bigger heart.

Messi was born in Argentina in 1987. When he was young, he loved playing soccer more than anything else. But there was a problem - Messi was much smaller than other kids his age. Doctors said he had a condition that made him grow very slowly.

His family didn't have enough money to pay for the medicine Messi needed to grow. This made Messi very sad because he thought he might never be able to play professional soccer.

When Messi was 13, a famous soccer team in Spain called Barcelona saw how talented he was. They offered to pay for his medicine and let him join their youth team. Messi and his family moved to Spain, far from home.

Living in a new country was hard. Messi missed his friends and family in Argentina. But he never stopped working hard. He practiced every day and got better and better at soccer.

Messi became one of the greatest players ever. He won many championships and scored hundreds of goals. He proved that being small doesn't stop you from achieving big dreams. He shows us that talent, hard work, and never giving up can overcome any obstacle.`,
    questions: [
      {
        id: 1,
        question: "What challenge did Messi face when he was young?",
        options: ["He was too tall", "He was much smaller than other kids", "He didn't like soccer", "He lived too far from school"],
        correct: "He was much smaller than other kids",
        explanation: "Messi had a condition that made him grow very slowly, making him much smaller than other children his age."
      },
      {
        id: 2,
        question: "Which team helped Messi when he was 13?",
        options: ["Real Madrid", "Barcelona", "Manchester United", "Bayern Munich"],
        correct: "Barcelona",
        explanation: "Barcelona saw Messi's talent and offered to pay for his medicine and let him join their youth team."
      },
      {
        id: 3,
        question: "What does Messi's story teach us?",
        options: ["Only tall people can play soccer", "Give up when things are hard", "Talent and hard work can overcome obstacles", "Money is the most important thing"],
        correct: "Talent and hard work can overcome obstacles",
        explanation: "Messi's story shows that with talent, hard work, and determination, you can overcome any challenge."
      }
    ]
  },
  {
    id: 6,
    name: "Muhammad Ali",
    sport: "Boxing",
    image: "🥊",
    story: `Muhammad Ali was not just a great boxer - he was a hero who stood up for what he believed in. He showed the world that athletes can be brave both inside and outside the ring.

Ali was born in Kentucky in 1942. His real name was Cassius Clay. When he was 12, someone stole his bicycle. He was so angry that he told a police officer he wanted to fight the thief. The officer said, "You better learn how to fight first," and took him to a boxing gym.

Ali discovered he was naturally good at boxing. He was fast with his hands and even faster with his feet. He would "float like a butterfly and sting like a bee," as he liked to say. He also loved to talk and would tell everyone he was "the greatest."

Ali won a gold medal at the Olympics when he was 18. He became the heavyweight champion of the world three times. But what made Ali truly special was his courage outside of boxing.

During a war, Ali refused to fight because he believed the war was wrong. This was a very brave thing to do. Many people were angry with him, and he lost his boxing titles. But Ali stood by his beliefs.

Later, people realized Ali was right to stand up for what he believed. He became a symbol of courage and doing what's right, even when it's hard. Ali taught us that being strong means standing up for your beliefs.`,
    questions: [
      {
        id: 1,
        question: "What was Muhammad Ali's real name?",
        options: ["Muhammad Ali", "Cassius Clay", "Joe Frazier", "George Foreman"],
        correct: "Cassius Clay",
        explanation: "Muhammad Ali was born with the name Cassius Clay and later changed his name to Muhammad Ali."
      },
      {
        id: 2,
        question: "How did Ali first discover boxing?",
        options: ["His dad taught him", "He saw it on TV", "Someone stole his bicycle", "He joined a school team"],
        correct: "Someone stole his bicycle",
        explanation: "When someone stole Ali's bicycle, he wanted to fight the thief, and a police officer took him to learn boxing first."
      },
      {
        id: 3,
        question: "What important lesson did Ali teach about courage?",
        options: ["Only fight when you're angry", "Always do what others want", "Stand up for your beliefs even when it's hard", "Winning is everything"],
        correct: "Stand up for your beliefs even when it's hard",
        explanation: "Ali showed great courage by standing up for his beliefs about war, even though it cost him his boxing titles."
      }
    ]
  }
];
