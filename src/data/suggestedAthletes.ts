export interface SuggestedAthlete {
  id: number;
  name: string;
  sport: string;
  image: string;
  description: string;
  story: string;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

export const suggestedAthletes: SuggestedAthlete[] = [
  // Soccer Athletes
  {
    id: 101,
    name: "Mia Hamm",
    sport: "Soccer",
    image: "⚽",
    description: "Soccer legend who inspired millions of girls to play and won 2 World Cups",
    story: `Mia Hamm is one of the greatest soccer players of all time. She showed the world that girls can be amazing athletes and inspired millions of young people to play soccer.

Mia was born in Alabama in 1972. When she was young, her family moved around a lot because her dad was in the Air Force. She started playing soccer when she was just 5 years old. Even as a little girl, she was faster and more skilled than most players.

When Mia was 15, she became the youngest person ever to play for the U.S. Women's National Soccer Team. This was incredible because she was still in high school! She had to balance homework and soccer practice while traveling around the world.

Mia helped her team win two World Cups and two Olympic gold medals. She scored 158 goals for her country, which was a world record for many years. She was known for her speed, her powerful kicks, and her ability to score goals when her team needed them most.

What made Mia special wasn't just her soccer skills. She was a great teammate who always encouraged others. She worked hard every day and never thought she was better than anyone else. She showed that being humble and kind is just as important as being talented.

After retiring from soccer, Mia started a foundation to help young athletes, especially girls, get opportunities to play sports. She believes that sports teach important lessons about teamwork, hard work, and never giving up.`,
    questions: [
      {
        id: 1,
        question: "How old was Mia when she first played for the U.S. National Team?",
        options: ["13", "15", "17", "19"],
        correct: "15",
        explanation: "Mia was only 15 years old when she became the youngest person ever to play for the U.S. Women's National Soccer Team."
      },
      {
        id: 2,
        question: "How many World Cups did Mia help her team win?",
        options: ["One", "Two", "Three", "Four"],
        correct: "Two",
        explanation: "Mia helped the U.S. Women's National Team win two World Cups during her amazing career."
      },
      {
        id: 3,
        question: "What does Mia do now to help young athletes?",
        options: ["Coaches a team", "Started a foundation", "Writes books", "Makes movies"],
        correct: "Started a foundation",
        explanation: "Mia started a foundation to help young athletes, especially girls, get opportunities to play sports."
      }
    ]
  },
  {
    id: 102,
    name: "Pelé",
    sport: "Soccer",
    image: "⚽",
    description: "Brazilian soccer king who brought joy to the game and won 3 World Cups",
    story: `Pelé is known as the greatest soccer player who ever lived. He brought joy and magic to soccer and showed the world how beautiful the game could be.

Pelé was born in Brazil in 1940. His real name is Edson, but everyone called him Pelé. His family was very poor, and they couldn't afford to buy him a real soccer ball. So young Pelé practiced by kicking around a sock stuffed with newspapers or a grapefruit.

Even without proper equipment, Pelé's talent was obvious. He learned to play soccer on the streets with his friends. By the time he was 15, he was playing for a professional team in Brazil. He was so good that people came from far away just to watch him play.

When Pelé was only 17 years old, he played in the World Cup for Brazil. He scored 6 goals and helped his team win the championship. He became the youngest player ever to win a World Cup. He would go on to win two more World Cups with Brazil.

Pelé scored over 1,000 goals in his career, which is more than almost any other player in history. But what made him special wasn't just the goals he scored. He played with such joy and creativity that he made soccer look like art. He could do things with the ball that seemed impossible.

Pelé always played with a smile on his face. He believed that soccer should be fun and bring people together. Even when playing against tough opponents, he was respectful and kind. He showed that you can be competitive and still be a good person.`,
    questions: [
      {
        id: 1,
        question: "What did young Pelé use as a soccer ball when his family couldn't afford one?",
        options: ["A rock", "A sock with newspapers", "A tennis ball", "A basketball"],
        correct: "A sock with newspapers",
        explanation: "Because his family was poor, Pelé practiced by kicking a sock stuffed with newspapers or a grapefruit."
      },
      {
        id: 2,
        question: "How many World Cups did Pelé win with Brazil?",
        options: ["Two", "Three", "Four", "Five"],
        correct: "Three",
        explanation: "Pelé won three World Cups with Brazil, starting when he was just 17 years old."
      },
      {
        id: 3,
        question: "About how many goals did Pelé score in his career?",
        options: ["500", "750", "Over 1,000", "1,500"],
        correct: "Over 1,000",
        explanation: "Pelé scored over 1,000 goals in his career, which is more than almost any other player in history."
      }
    ]
  },
  // Basketball Athletes
  {
    id: 103,
    name: "Michael Jordan",
    sport: "Basketball",
    image: "🏀",
    description: "The greatest basketball player who never gave up and won 6 championships",
    story: `Michael Jordan is considered the greatest basketball player of all time. He showed the world that with hard work and determination, you can overcome any obstacle and achieve your dreams.

Michael was born in New York in 1963, but grew up in North Carolina. As a young boy, he loved sports and was very competitive. He played baseball, football, and basketball. But basketball wasn't always easy for him.

When Michael tried out for his high school basketball team as a sophomore, he was cut from the team! The coach thought he wasn't good enough and wasn't tall enough. Michael was heartbroken, but instead of giving up, he used this disappointment to motivate himself.

Michael practiced basketball every single day. He would wake up early to practice before school and stay late after school to practice more. He grew taller and got stronger, but most importantly, he developed an incredible work ethic that would make him famous.

By his senior year, Michael was one of the best high school players in the country. He went to the University of North Carolina and hit the winning shot in the national championship game. Then he joined the Chicago Bulls in the NBA.

With the Bulls, Michael won 6 NBA championships. He was known for his amazing ability to jump high and make incredible shots. But what made him truly special was that he never gave up, especially in the most important moments. He always wanted to take the last shot when the game was on the line.

Michael taught us that failure can make you stronger if you learn from it and keep working hard.`,
    questions: [
      {
        id: 1,
        question: "What happened when Michael first tried out for his high school basketball team?",
        options: ["He made the team easily", "He was cut from the team", "He became team captain", "He was injured"],
        correct: "He was cut from the team",
        explanation: "Michael was cut from his high school basketball team as a sophomore, but he used this disappointment to motivate himself to work harder."
      },
      {
        id: 2,
        question: "How many NBA championships did Michael win with the Chicago Bulls?",
        options: ["4", "5", "6", "7"],
        correct: "6",
        explanation: "Michael Jordan won 6 NBA championships with the Chicago Bulls during his incredible career."
      },
      {
        id: 3,
        question: "What important lesson does Michael Jordan teach us?",
        options: ["Talent is everything", "Failure can make you stronger", "Only tall people can play basketball", "Winning is the only thing that matters"],
        correct: "Failure can make you stronger",
        explanation: "Michael showed us that failure can make you stronger if you learn from it and keep working hard."
      }
    ]
  },
  {
    id: 104,
    name: "Stephen Curry",
    sport: "Basketball",
    image: "🏀",
    description: "Amazing shooter who changed basketball with his incredible three-pointers",
    story: `Stephen Curry changed the game of basketball forever with his incredible shooting ability. He showed that you don't have to be the biggest or strongest player to be great - you just need to work hard and believe in yourself.

Stephen was born in Ohio in 1988. His dad, Dell Curry, was also a professional basketball player. Stephen grew up around basketball, but he was always smaller than other kids his age. Many people thought he would never be good enough to play professional basketball.

In high school, Stephen was a good player, but college coaches didn't think he was big enough or strong enough for their teams. Only one small college, Davidson, offered him a scholarship. Many people thought this proved he wasn't good enough for the big leagues.

At Davidson College, Stephen proved everyone wrong. He led his small school to the Elite Eight in the NCAA tournament, beating much bigger schools along the way. He did this by making three-point shots from distances that seemed impossible. People had never seen shooting like this before.

When Stephen joined the Golden State Warriors in the NBA, he continued to amaze people with his shooting. He could make three-point shots from the center of the court! He made so many three-pointers that he changed how basketball is played. Now all teams try to shoot more three-pointers because of Stephen.

Stephen has won multiple NBA championships and has been named the league's Most Valuable Player. But what makes him special isn't just his shooting - it's his positive attitude and the way he celebrates with his teammates. He shows that basketball should be fun.

Stephen proves that if you work hard on your skills and believe in yourself, you can achieve anything, no matter what size you are.`,
    questions: [
      {
        id: 1,
        question: "Why did many college coaches not want Stephen Curry on their teams?",
        options: ["He couldn't shoot well", "He was too small", "He didn't like basketball", "He was too young"],
        correct: "He was too small",
        explanation: "Many college coaches thought Stephen was too small and not strong enough, so only Davidson College offered him a scholarship."
      },
      {
        id: 2,
        question: "How did Stephen change the game of basketball?",
        options: ["He made dunking popular", "He made three-point shooting more important", "He made defense more important", "He made the game slower"],
        correct: "He made three-point shooting more important",
        explanation: "Stephen's incredible three-point shooting changed how basketball is played, with all teams now trying to shoot more three-pointers."
      },
      {
        id: 3,
        question: "What important lesson does Stephen Curry teach us?",
        options: ["Only tall people can succeed", "Hard work and belief can overcome physical limitations", "Shooting is the only skill that matters", "You need famous parents to succeed"],
        correct: "Hard work and belief can overcome physical limitations",
        explanation: "Stephen shows that if you work hard on your skills and believe in yourself, you can achieve anything, no matter what size you are."
      }
    ]
  },
  // Baseball Athletes
  {
    id: 105,
    name: "Jackie Robinson",
    sport: "Baseball",
    image: "⚾",
    description: "Brave player who broke barriers and changed baseball forever",
    story: `Jackie Robinson was not just a great baseball player - he was a hero who changed America. He broke the color barrier in Major League Baseball and showed incredible courage in the face of unfair treatment.

Jackie was born in Georgia in 1919, but his family moved to California when he was young. He was an amazing athlete who played football, basketball, track, and baseball in college. He was so good that he could have been a professional athlete in any of these sports.

Before Jackie, Major League Baseball had a terrible rule that Black players couldn't play with white players. Black players had to play in their own separate leagues, even though many of them were just as good or better than white players. This was unfair and wrong.

In 1947, the Brooklyn Dodgers decided to sign Jackie Robinson, making him the first Black player in Major League Baseball in the modern era. This was a very brave decision because many people were angry about it. Jackie knew he would face hatred and mean treatment, but he agreed to play anyway.

Jackie's first season was very difficult. Some fans yelled terrible things at him, and some players on other teams tried to hurt him. But Jackie had promised to stay calm and let his playing do the talking. He was an incredible player who could hit, run, and field better than almost anyone.

Jackie won the Rookie of the Year award in his first season and later won the Most Valuable Player award. More importantly, he opened the door for other Black players to join Major League Baseball. Soon, many of the best players in baseball were Black players who finally had the chance to show their talents.

Jackie Robinson showed that courage and dignity can change the world. He made baseball and America better for everyone.`,
    questions: [
      {
        id: 1,
        question: "What barrier did Jackie Robinson break in 1947?",
        options: ["He was the first player to hit 50 home runs", "He was the first Black player in modern Major League Baseball", "He was the first player from California", "He was the first player to steal 50 bases"],
        correct: "He was the first Black player in modern Major League Baseball",
        explanation: "Jackie Robinson broke the color barrier by becoming the first Black player in Major League Baseball in the modern era."
      },
      {
        id: 2,
        question: "How did Jackie handle the unfair treatment he received?",
        options: ["He fought back angrily", "He quit baseball", "He stayed calm and let his playing do the talking", "He only played home games"],
        correct: "He stayed calm and let his playing do the talking",
        explanation: "Jackie promised to stay calm and respond to hatred with excellent play, showing incredible courage and dignity."
      },
      {
        id: 3,
        question: "What was the most important result of Jackie's courage?",
        options: ["He won many awards", "He opened the door for other Black players", "He became very famous", "He made a lot of money"],
        correct: "He opened the door for other Black players",
        explanation: "Jackie's courage opened the door for other Black players to join Major League Baseball, making the sport better for everyone."
      }
    ]
  },
  {
    id: 106,
    name: "Babe Ruth",
    sport: "Baseball",
    image: "⚾",
    description: "Home run hero who became America's favorite baseball player",
    story: `Babe Ruth is the most famous baseball player who ever lived. He changed baseball from a slow, boring game into an exciting sport that everyone loved to watch. He showed that one person can make a huge difference.

Babe was born in Baltimore in 1895. His real name was George Herman Ruth Jr., but everyone called him Babe. He had a difficult childhood and was sent to a school for boys who needed help. It was there that he learned to play baseball from a teacher who became like a father to him.

When Babe first started playing professional baseball, he was a pitcher. He was actually a very good pitcher and helped his team, the Boston Red Sox, win the World Series. But then something amazing happened - people discovered that Babe could hit the ball farther than anyone had ever seen.

In those days, baseball games were usually low-scoring and slow. Players tried to get on base and score one run at a time. But Babe changed everything by hitting home runs - lots of them! In 1920, he hit 54 home runs, which was more than most entire teams hit in a whole season.

When Babe joined the New York Yankees, he became the most famous person in America. People came from all over the country just to watch him play. He hit 714 home runs in his career, which was a record that lasted for many years. But he wasn't just about home runs - he was also fun to watch and had a great personality.

Babe was known for being kind to children. He would visit kids in hospitals and always had time to sign autographs. He showed that famous people should use their fame to help others and make people happy.

Babe Ruth made baseball America's favorite sport and showed that sports could bring joy to millions of people.`,
    questions: [
      {
        id: 1,
        question: "What position did Babe Ruth play before he became famous for hitting home runs?",
        options: ["Catcher", "First baseman", "Pitcher", "Shortstop"],
        correct: "Pitcher",
        explanation: "Babe Ruth started as a pitcher and was actually very good at it before people discovered his amazing hitting ability."
      },
      {
        id: 2,
        question: "How many home runs did Babe Ruth hit in his career?",
        options: ["654", "714", "755", "762"],
        correct: "714",
        explanation: "Babe Ruth hit 714 home runs in his career, which was a record that lasted for many years."
      },
      {
        id: 3,
        question: "How did Babe Ruth change baseball?",
        options: ["He made it slower", "He made it more exciting with home runs", "He made it more complicated", "He made it shorter"],
        correct: "He made it more exciting with home runs",
        explanation: "Babe Ruth changed baseball from a slow, low-scoring game into an exciting sport by hitting lots of home runs."
      }
    ]
  },
  // Football Athletes
  {
    id: 107,
    name: "Tom Brady",
    sport: "Football",
    image: "🏈",
    description: "Quarterback who never gave up and won 7 Super Bowls",
    story: `Tom Brady is considered one of the greatest football players of all time. He showed the world that with hard work, determination, and never giving up, you can achieve incredible things even when others don't believe in you.

Tom was born in California in 1977. He loved football from a young age and dreamed of playing in the NFL. But Tom wasn't the biggest, strongest, or fastest player. Many coaches and scouts didn't think he was good enough to be a professional football player.

In college at the University of Michigan, Tom had to work very hard just to get a chance to play. He wasn't the starting quarterback right away and had to prove himself every day in practice. Even when he did get to play, many people still didn't think he was special.

When it came time for the NFL Draft, Tom was chosen very late - he was the 199th player picked! This meant that 198 players were chosen before him. Six other quarterbacks were picked before Tom. Most people thought he would never be an important player in the NFL.

But Tom proved everyone wrong. He worked harder than anyone else and studied the game more than any other player. When he got his chance to play for the New England Patriots, he led them to victory after victory. He won his first Super Bowl when he was just 24 years old.

Tom went on to win 7 Super Bowl championships, which is more than any other player in history. He played until he was 45 years old, which is very old for a football player. Even in his last game, he was still one of the best players on the field.

What made Tom special wasn't just his talent - it was his work ethic and his refusal to give up. He showed that if you believe in yourself and work hard, you can overcome any obstacle and achieve your dreams.`,
    questions: [
      {
        id: 1,
        question: "What number was Tom Brady when he was drafted into the NFL?",
        options: ["1st", "50th", "199th", "250th"],
        correct: "199th",
        explanation: "Tom Brady was the 199th player chosen in the NFL Draft, meaning 198 players were picked before him."
      },
      {
        id: 2,
        question: "How many Super Bowl championships did Tom Brady win?",
        options: ["5", "6", "7", "8"],
        correct: "7",
        explanation: "Tom Brady won 7 Super Bowl championships, which is more than any other player in NFL history."
      },
      {
        id: 3,
        question: "What made Tom Brady special as a player?",
        options: ["He was the biggest player", "He was the fastest player", "His work ethic and refusal to give up", "He was the strongest player"],
        correct: "His work ethic and refusal to give up",
        explanation: "Tom's work ethic and determination to never give up made him special, not just his physical abilities."
      }
    ]
  },
  {
    id: 108,
    name: "Jerry Rice",
    sport: "Football",
    image: "🏈",
    description: "Greatest receiver who caught more passes than anyone through hard work",
    story: `Jerry Rice is considered the greatest wide receiver in football history. He showed that with incredible work ethic and dedication, you can become the best at what you do, even if you don't start with natural advantages.

Jerry was born in Mississippi in 1962. He grew up in a small town where his family didn't have much money. His dad was a brick mason, and Jerry often helped him carry bricks and materials. This hard physical work made Jerry strong and gave him great hands for catching things.

In high school, Jerry wasn't heavily recruited by big colleges. He went to Mississippi Valley State, a small college that most people had never heard of. But Jerry worked harder than anyone else and became an amazing player. He caught so many passes and scored so many touchdowns that NFL scouts finally noticed him.

When Jerry joined the San Francisco 49ers, he continued his incredible work ethic. While other players went home after practice, Jerry stayed to run extra routes and catch more passes. He would run up hills to build his strength and practice catching balls until it was dark outside.

Jerry's hard work paid off in amazing ways. He caught more passes, gained more yards, and scored more touchdowns than any receiver in NFL history. He helped the 49ers win three Super Bowl championships. Even when he was in his 30s and 40s, he was still one of the best players in the league.

What made Jerry special wasn't just his natural talent - it was his commitment to being the best. He studied game film more than anyone else, practiced longer than anyone else, and took better care of his body than anyone else. He showed that excellence comes from daily hard work.

Jerry Rice proved that if you're willing to work harder than everyone else, you can achieve greatness no matter where you come from.`,
    questions: [
      {
        id: 1,
        question: "What job did Jerry Rice's father have that helped Jerry develop strong hands?",
        options: ["Farmer", "Brick mason", "Carpenter", "Mechanic"],
        correct: "Brick mason",
        explanation: "Jerry's father was a brick mason, and helping him carry bricks and materials gave Jerry strong hands perfect for catching footballs."
      },
      {
        id: 2,
        question: "What did Jerry do differently from other players after practice?",
        options: ["He went home early", "He stayed to do extra work", "He played other sports", "He watched TV"],
        correct: "He stayed to do extra work",
        explanation: "While other players went home after practice, Jerry stayed to run extra routes, catch more passes, and work on his skills."
      },
      {
        id: 3,
        question: "What is the main lesson from Jerry Rice's story?",
        options: ["Natural talent is everything", "Hard work can lead to greatness", "Only big colleges produce great players", "You need to be the fastest to succeed"],
        correct: "Hard work can lead to greatness",
        explanation: "Jerry Rice showed that if you're willing to work harder than everyone else, you can achieve greatness no matter where you come from."
      }
    ]
  }
];

export const sportCategories = [
  { name: "Soccer", emoji: "⚽", athletes: ["Mia Hamm", "Pelé"] },
  { name: "Basketball", emoji: "🏀", athletes: ["Michael Jordan", "Stephen Curry"] },
  { name: "Baseball", emoji: "⚾", athletes: ["Jackie Robinson", "Babe Ruth"] },
  { name: "Football", emoji: "🏈", athletes: ["Tom Brady", "Jerry Rice"] }
];
