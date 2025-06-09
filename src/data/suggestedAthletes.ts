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
  // SOCCER ATHLETES (5 total - IDs 101-105)
  {
    id: 101,
    name: "Pelé",
    sport: "Soccer",
    image: "⚽",
    description: "Brazilian soccer king who brought joy to the game and won 3 World Cups",
    story: `Pelé is known as the greatest soccer player who ever lived. He was born in Brazil in 1940 to a very poor family. They couldn't afford a real soccer ball, so young Pelé practiced by kicking around a sock stuffed with newspapers or a grapefruit.

Despite having no proper equipment, Pelé's talent was obvious. He learned to play soccer on the streets with his friends. By age 15, he was playing for a professional team. When he was only 17, he played in the World Cup for Brazil, scored 6 goals, and helped his team win the championship.

Pelé scored over 1,000 goals in his career and won three World Cups with Brazil. He played with such joy and creativity that he made soccer look like art. He always had a smile on his face and showed that you can be competitive while still being kind to others.`,
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
        question: "What important lesson does Pelé teach us?",
        options: ["Only rich kids can succeed", "You can be competitive and still be kind", "Soccer is just about winning", "Talent doesn't need practice"],
        correct: "You can be competitive and still be kind",
        explanation: "Pelé showed that you can be the best player in the world while still being respectful and kind to others."
      }
    ]
  },
  {
    id: 102,
    name: "Cristiano Ronaldo",
    sport: "Soccer",
    image: "⚽",
    description: "Portuguese superstar who works harder than anyone and scores amazing goals",
    story: `Cristiano Ronaldo was born on a small island in Portugal in 1985. His family didn't have much money, and life was difficult. When he was 12, he left his family to join a soccer academy far from home, missing his family terribly but knowing this was his chance to follow his dream.

At the academy, Cristiano worked harder than any other player. While other kids played video games, he practiced his kicks and studied the game. His incredible work ethic paid off as he became a professional player for some of the best teams in the world.

Cristiano has scored over 800 goals in his career and won five Champions League titles. Even now that he's famous and successful, he still trains harder than players half his age. He shows us that talent alone is not enough - you need to work hard every single day to achieve your dreams.`,
    questions: [
      {
        id: 1,
        question: "How old was Cristiano when he left home to join a soccer academy?",
        options: ["10", "12", "14", "16"],
        correct: "12",
        explanation: "Cristiano was only 12 years old when he left his family to join a soccer academy."
      },
      {
        id: 2,
        question: "What makes Cristiano Ronaldo special as a player?",
        options: ["He's the tallest player", "His incredible work ethic", "He's the fastest runner", "He has the most money"],
        correct: "His incredible work ethic",
        explanation: "Cristiano's incredible work ethic and dedication to training make him special."
      },
      {
        id: 3,
        question: "What lesson does Cristiano teach us about success?",
        options: ["Talent is everything", "Hard work every day is necessary", "Only natural ability matters", "Success comes easily"],
        correct: "Hard work every day is necessary",
        explanation: "Cristiano shows that talent alone is not enough - you need to work hard every day to achieve your dreams."
      }
    ]
  },
  {
    id: 103,
    name: "Mia Hamm",
    sport: "Soccer",
    image: "⚽",
    description: "American soccer legend who inspired millions of girls and won 2 World Cups",
    story: `Mia Hamm was born in Alabama in 1972. Her family moved around a lot because her dad was in the Air Force. She started playing soccer when she was 5 years old and was faster and more skilled than most players, even as a little girl.

When Mia was 15, she became the youngest person ever to play for the U.S. Women's National Soccer Team while still in high school. She had to balance homework and soccer practice while traveling around the world to play for her country.

Mia helped her team win two World Cups and two Olympic gold medals. She scored 158 goals for her country, which was a world record for many years. After retiring, she started a foundation to help young athletes, especially girls, get opportunities to play sports.`,
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
        explanation: "Mia helped the U.S. Women's National Team win two World Cups during her career."
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
    id: 104,
    name: "Diego Maradona",
    sport: "Soccer",
    image: "⚽",
    description: "Argentine genius who overcame poverty to become a soccer legend",
    story: `Diego Maradona was born in Argentina in 1960 to a very poor family. They lived in a small house without running water or electricity. Despite having very little, Diego's family was full of love and support for his soccer dreams.

When Diego was just 8 years old, a talent scout discovered him playing soccer in the streets. Even as a little boy, he could do amazing things with a soccer ball that amazed everyone. By age 15, he was playing for a professional team.

Diego's greatest moment came in 1986 when he led Argentina to win the World Cup. He scored some of the most beautiful goals ever seen and inspired his teammates to play their best. For the people of Argentina, Diego became a symbol of hope and showed that soccer can lift people up no matter what challenges they face.`,
    questions: [
      {
        id: 1,
        question: "How old was Diego when he was discovered by a talent scout?",
        options: ["6", "8", "10", "12"],
        correct: "8",
        explanation: "Diego was just 8 years old when a talent scout discovered him playing soccer in the streets."
      },
      {
        id: 2,
        question: "What was Diego's greatest achievement?",
        options: ["Scoring 1000 goals", "Leading Argentina to win the 1986 World Cup", "Playing until age 45", "Becoming the richest player"],
        correct: "Leading Argentina to win the 1986 World Cup",
        explanation: "Diego's greatest moment was leading Argentina to win the 1986 World Cup."
      },
      {
        id: 3,
        question: "What does Diego's story teach us?",
        options: ["Only rich kids can succeed", "Talent and hard work can overcome poverty", "Soccer is just a game", "You need perfect conditions to succeed"],
        correct: "Talent and hard work can overcome poverty",
        explanation: "Diego showed that no matter how poor you are, you can achieve great things with talent and hard work."
      }
    ]
  },
  {
    id: 105,
    name: "Ronaldinho",
    sport: "Soccer",
    image: "⚽",
    description: "Brazilian magician who played with joy and amazed the world",
    story: `Ronaldinho was born in Brazil in 1980. His real name is Ronaldo, but everyone called him Ronaldinho, which means "little Ronaldo." He grew up in a poor neighborhood, but his family loved soccer and supported his dreams.

From a young age, Ronaldinho was different from other players. While most focused on being strong or fast, he focused on being creative. He could do tricks with the ball that no one had ever seen before, practicing for hours and inventing new ways to dribble and score.

When Ronaldinho played, he always had a huge smile on his face. Even in the most important games, he looked like he was having fun with friends. He won the World Cup with Brazil and many trophies, but what people remember most is the incredible magic he created that reminded everyone that soccer should be fun.`,
    questions: [
      {
        id: 1,
        question: "What does 'Ronaldinho' mean?",
        options: ["Big Ronaldo", "Little Ronaldo", "Fast Ronaldo", "Strong Ronaldo"],
        correct: "Little Ronaldo",
        explanation: "Ronaldinho means 'little Ronaldo' in Portuguese, which was his nickname."
      },
      {
        id: 2,
        question: "What made Ronaldinho different from other players?",
        options: ["He was the fastest", "He was the strongest", "He was the most creative", "He was the tallest"],
        correct: "He was the most creative",
        explanation: "Ronaldinho focused on being creative and could do tricks with the ball that no one had ever seen before."
      },
      {
        id: 3,
        question: "What important lesson does Ronaldinho teach us?",
        options: ["Winning is everything", "Soccer should be serious", "Do what you love with joy and passion", "Only practice matters"],
        correct: "Do what you love with joy and passion",
        explanation: "Ronaldinho shows us that when you do what you love with passion and joy, you can create magical moments."
      }
    ]
  },

  // BASKETBALL ATHLETES (5 total - IDs 106-110)
  {
    id: 106,
    name: "Michael Jordan",
    sport: "Basketball",
    image: "🏀",
    description: "The greatest basketball player who never gave up and won 6 championships",
    story: `Michael Jordan was born in New York in 1963 and grew up in North Carolina. When he tried out for his high school basketball team as a sophomore, he was cut from the team! The coach thought he wasn't good enough and wasn't tall enough.

Instead of giving up, Michael used this disappointment to motivate himself. He practiced basketball every single day, waking up early to practice before school and staying late after school. He grew taller and got stronger, but most importantly, he developed an incredible work ethic.

Michael went on to win 6 NBA championships with the Chicago Bulls. He was known for his amazing ability to jump high and make incredible shots, especially in the most important moments. He taught us that failure can make you stronger if you learn from it and keep working hard.`,
    questions: [
      {
        id: 1,
        question: "What happened when Michael first tried out for his high school basketball team?",
        options: ["He made the team easily", "He was cut from the team", "He became team captain", "He was injured"],
        correct: "He was cut from the team",
        explanation: "Michael was cut from his high school basketball team, but he used this disappointment to motivate himself to work harder."
      },
      {
        id: 2,
        question: "How many NBA championships did Michael win?",
        options: ["4", "5", "6", "7"],
        correct: "6",
        explanation: "Michael Jordan won 6 NBA championships with the Chicago Bulls."
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
    id: 107,
    name: "LeBron James",
    sport: "Basketball",
    image: "🏀",
    description: "Basketball superstar known for his skills and big heart for helping others",
    story: `LeBron James was born in Ohio in 1984 and grew up in a poor family with just his mom. Life was hard, but his mom worked very hard to take care of him. Basketball became LeBron's way to have fun and stay out of trouble.

In high school, LeBron was already amazing at basketball. When he was 18, he went straight from high school to play in the NBA, which is very rare. He has played for three different NBA teams and won championships with all of them.

What makes LeBron special isn't just his basketball skills, but how he helps his community. He opened a school in his hometown for kids who need extra help and pays for kids to go to college. He shows us that success means helping others and remembering where you came from.`,
    questions: [
      {
        id: 1,
        question: "How many different NBA teams has LeBron played for?",
        options: ["Two", "Three", "Four", "Five"],
        correct: "Three",
        explanation: "LeBron has played for three NBA teams and won championships with all of them."
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
        question: "What does LeBron teach us about success?",
        options: ["Only focus on yourself", "Success means helping others", "Money is most important", "Forget where you came from"],
        correct: "Success means helping others",
        explanation: "LeBron shows us that true success means helping others and remembering where you came from."
      }
    ]
  },
  {
    id: 108,
    name: "Kobe Bryant",
    sport: "Basketball",
    image: "🏀",
    description: "Mamba Mentality legend who inspired millions with his dedication",
    story: `Kobe Bryant was born in 1978 and spent part of his childhood in Italy where his father played basketball. He learned to speak Italian and developed a love for the game that would define his life. When he returned to the United States, he was determined to become the best.

Kobe went straight from high school to the NBA and played his entire 20-year career with the Los Angeles Lakers. He was known for his "Mamba Mentality" - a mindset of constant improvement and never giving up. He would practice at 4 AM when other players were sleeping.

Kobe won 5 NBA championships and became one of the greatest players ever. After retiring, he won an Academy Award for a short film he created. He showed us that with dedication and hard work, you can achieve greatness in whatever you choose to do.`,
    questions: [
      {
        id: 1,
        question: "What country did Kobe live in as a child?",
        options: ["Spain", "France", "Italy", "Germany"],
        correct: "Italy",
        explanation: "Kobe spent part of his childhood in Italy where his father played basketball."
      },
      {
        id: 2,
        question: "What was Kobe's famous mindset called?",
        options: ["Tiger Mentality", "Mamba Mentality", "Eagle Mentality", "Lion Mentality"],
        correct: "Mamba Mentality",
        explanation: "Kobe was known for his 'Mamba Mentality' - a mindset of constant improvement and never giving up."
      },
      {
        id: 3,
        question: "What did Kobe win after retiring from basketball?",
        options: ["A Grammy Award", "An Academy Award", "A Nobel Prize", "A Pulitzer Prize"],
        correct: "An Academy Award",
        explanation: "After retiring, Kobe won an Academy Award for a short film he created."
      }
    ]
  },
  {
    id: 109,
    name: "Magic Johnson",
    sport: "Basketball",
    image: "🏀",
    description: "Showtime Lakers legend who brought joy and teamwork to basketball",
    story: `Magic Johnson was born in Michigan in 1959. He got his nickname "Magic" in high school because he could do amazing things with a basketball that seemed like magic. He was tall like a center but could pass like a point guard, which was very unusual.

Magic led his college team to win the national championship and then joined the Los Angeles Lakers. He helped create "Showtime" basketball - a fast, exciting style of play that was fun to watch. The Lakers won 5 championships during his career.

What made Magic special was his incredible passing ability and his leadership. He always made his teammates better and showed that basketball is a team sport. Even when he faced personal challenges, including a serious illness, he remained positive and continued to inspire others.`,
    questions: [
      {
        id: 1,
        question: "How did Magic Johnson get his nickname?",
        options: ["He was a real magician", "He could do amazing things with a basketball", "He wore a magic jersey", "He had magic shoes"],
        correct: "He could do amazing things with a basketball",
        explanation: "Magic got his nickname in high school because he could do amazing things with a basketball that seemed like magic."
      },
      {
        id: 2,
        question: "What style of basketball did Magic help create with the Lakers?",
        options: ["Slowtime", "Showtime", "Halftime", "Overtime"],
        correct: "Showtime",
        explanation: "Magic helped create 'Showtime' basketball - a fast, exciting style of play that was fun to watch."
      },
      {
        id: 3,
        question: "What was Magic Johnson's greatest strength as a player?",
        options: ["Scoring points", "Playing defense", "Making his teammates better", "Jumping high"],
        correct: "Making his teammates better",
        explanation: "Magic's greatest strength was his ability to make his teammates better and show that basketball is a team sport."
      }
    ]
  },
  {
    id: 110,
    name: "Stephen Curry",
    sport: "Basketball",
    image: "🏀",
    description: "Amazing shooter who changed basketball with incredible three-pointers",
    story: `Stephen Curry was born in Ohio in 1988. His dad was also a professional basketball player, but Stephen was always smaller than other kids his age. Many people thought he would never be good enough to play professional basketball because of his size.

In high school and college, Stephen was a good player, but most coaches didn't think he was big enough or strong enough for the NBA. Only one small college offered him a scholarship, and many people thought this proved he wasn't good enough for the big leagues.

Stephen proved everyone wrong by becoming one of the greatest shooters in basketball history. He can make three-point shots from distances that seem impossible and has changed how basketball is played. He shows that if you work hard on your skills and believe in yourself, you can achieve anything, no matter what size you are.`,
    questions: [
      {
        id: 1,
        question: "Why did many people think Stephen couldn't play professional basketball?",
        options: ["He couldn't shoot well", "He was too small", "He didn't like basketball", "He was too young"],
        correct: "He was too small",
        explanation: "Many people thought Stephen was too small to play professional basketball."
      },
      {
        id: 2,
        question: "How did Stephen change the game of basketball?",
        options: ["He made dunking popular", "He made three-point shooting more important", "He made defense more important", "He made the game slower"],
        correct: "He made three-point shooting more important",
        explanation: "Stephen's incredible three-point shooting changed how basketball is played."
      },
      {
        id: 3,
        question: "What lesson does Stephen Curry teach us?",
        options: ["Only tall people can succeed", "Hard work and belief can overcome physical limitations", "Shooting is the only skill that matters", "Size is everything in sports"],
        correct: "Hard work and belief can overcome physical limitations",
        explanation: "Stephen shows that if you work hard and believe in yourself, you can achieve anything, no matter what size you are."
      }
    ]
  },

  // BASEBALL ATHLETES (5 total - IDs 111-115)
  {
    id: 111,
    name: "Babe Ruth",
    sport: "Baseball",
    image: "⚾",
    description: "Home run hero who became America's favorite baseball player",
    story: `Babe Ruth was born in Baltimore in 1895. His real name was George Herman Ruth Jr., but everyone called him Babe. He had a difficult childhood and was sent to a school for boys who needed help, where he learned to play baseball from a teacher who became like a father to him.

When Babe first started playing professional baseball, he was a pitcher and was actually very good at it. But then people discovered that Babe could hit the ball farther than anyone had ever seen. In 1920, he hit 54 home runs, which was more than most entire teams hit in a whole season.

Babe changed baseball from a slow, boring game into an exciting sport that everyone loved to watch. He hit 714 home runs in his career and was known for being kind to children, visiting kids in hospitals and always having time to sign autographs. He made baseball America's favorite sport.`,
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
  {
    id: 112,
    name: "Jackie Robinson",
    sport: "Baseball",
    image: "⚾",
    description: "Brave player who broke barriers and changed baseball forever",
    story: `Jackie Robinson was born in Georgia in 1919. Before Jackie, Major League Baseball had an unfair rule that Black players couldn't play with white players. Black players had to play in their own separate leagues, even though many were just as good or better than white players.

In 1947, the Brooklyn Dodgers decided to sign Jackie Robinson, making him the first Black player in Major League Baseball in the modern era. Jackie knew he would face hatred and mean treatment, but he agreed to play anyway because he wanted to open doors for others.

Jackie's first season was very difficult. Some fans yelled terrible things at him, but Jackie had promised to stay calm and let his playing do the talking. He won the Rookie of the Year award and later the Most Valuable Player award. His courage opened the door for other Black players and made baseball better for everyone.`,
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
        explanation: "Jackie promised to stay calm and respond to hatred with excellent play, showing incredible courage."
      },
      {
        id: 3,
        question: "What was the most important result of Jackie's courage?",
        options: ["He won many awards", "He opened the door for other Black players", "He became very famous", "He made a lot of money"],
        correct: "He opened the door for other Black players",
        explanation: "Jackie's courage opened the door for other Black players to join Major League Baseball."
      }
    ]
  },
  {
    id: 113,
    name: "Derek Jeter",
    sport: "Baseball",
    image: "⚾",
    description: "Yankees captain who was clutch in big moments and a true leader",
    story: `Derek Jeter was born in New Jersey in 1974 and grew up dreaming of playing for the New York Yankees. His parents taught him to work hard, be respectful, and always do his best. Even as a young player, Derek showed great leadership qualities.

Derek was drafted by the Yankees when he was 18 and worked his way up through the minor leagues. When he finally made it to the major leagues, he became the Yankees' shortstop and later their captain. He was known for making great plays in the most important moments.

During his 20-year career with the Yankees, Derek helped his team win 5 World Series championships. He was famous for his clutch hitting and his leadership on and off the field. After retiring, he became a successful businessman and showed that the lessons learned in sports can help you succeed in life.`,
    questions: [
      {
        id: 1,
        question: "What position did Derek Jeter play for the Yankees?",
        options: ["Pitcher", "Catcher", "Shortstop", "First baseman"],
        correct: "Shortstop",
        explanation: "Derek Jeter was the Yankees' shortstop and later became their captain."
      },
      {
        id: 2,
        question: "How many World Series championships did Derek help the Yankees win?",
        options: ["3", "4", "5", "6"],
        correct: "5",
        explanation: "Derek Jeter helped the Yankees win 5 World Series championships during his career."
      },
      {
        id: 3,
        question: "What was Derek Jeter most famous for as a player?",
        options: ["Hitting home runs", "Stealing bases", "Making clutch plays in important moments", "Pitching"],
        correct: "Making clutch plays in important moments",
        explanation: "Derek was famous for his clutch hitting and making great plays in the most important moments."
      }
    ]
  },
  {
    id: 114,
    name: "Lou Gehrig",
    sport: "Baseball",
    image: "⚾",
    description: "Iron Horse who showed incredible courage in the face of illness",
    story: `Lou Gehrig was born in New York in 1903 to immigrant parents who worked very hard to support their family. Lou was a great student and athlete, and his parents wanted him to go to college, but he loved baseball and dreamed of playing professionally.

Lou joined the New York Yankees and became known as the "Iron Horse" because he played in 2,130 consecutive games - that means he didn't miss a single game for over 14 years! He was one of the best hitters in baseball and helped the Yankees win many championships.

Sadly, Lou developed a serious illness that made him weak and forced him to retire from baseball. Even though he was sick, he gave a famous speech where he said he was "the luckiest man on the face of the earth" because of all the good things in his life. He showed incredible courage and taught us to be grateful for what we have.`,
    questions: [
      {
        id: 1,
        question: "Why was Lou Gehrig called the 'Iron Horse'?",
        options: ["He was very strong", "He played in 2,130 consecutive games", "He hit the most home runs", "He was the fastest runner"],
        correct: "He played in 2,130 consecutive games",
        explanation: "Lou was called the 'Iron Horse' because he played in 2,130 consecutive games without missing a single one."
      },
      {
        id: 2,
        question: "What did Lou say in his famous speech when he retired?",
        options: ["He was angry about being sick", "He was the luckiest man on earth", "He wanted to keep playing", "He was sad about everything"],
        correct: "He was the luckiest man on earth",
        explanation: "Even though he was sick, Lou said he was 'the luckiest man on the face of the earth' because of all the good things in his life."
      },
      {
        id: 3,
        question: "What important lesson does Lou Gehrig teach us?",
        options: ["Never get sick", "Be grateful for what you have", "Only focus on sports", "Avoid difficult situations"],
        correct: "Be grateful for what you have",
        explanation: "Lou taught us to be grateful for what we have and to show courage even when facing difficult challenges."
      }
    ]
  },
  {
    id: 115,
    name: "Hank Aaron",
    sport: "Baseball",
    image: "⚾",
    description: "Home run king who persevered through racism to become a legend",
    story: `Hank Aaron was born in Alabama in 1934 during a time when Black and white people were forced to live separately. Despite facing discrimination, Hank loved baseball and dreamed of playing professionally. He started in the Negro Leagues before joining Major League Baseball.

When Hank joined the Milwaukee Braves, he faced racism from some fans and players, but he never let it stop him from playing his best. He was a consistent hitter who got better every year, and people began to notice that he might break Babe Ruth's home run record.

In 1974, Hank hit his 715th home run, breaking Babe Ruth's record that had stood for 39 years. Even though some people sent him hate mail, he persevered with dignity and grace. He finished his career with 755 home runs and showed that perseverance and character are more important than anything else.`,
    questions: [
      {
        id: 1,
        question: "What record did Hank Aaron break in 1974?",
        options: ["Most stolen bases", "Babe Ruth's home run record", "Most games played", "Most hits"],
        correct: "Babe Ruth's home run record",
        explanation: "In 1974, Hank Aaron broke Babe Ruth's home run record by hitting his 715th home run."
      },
      {
        id: 2,
        question: "How many home runs did Hank Aaron finish his career with?",
        options: ["714", "755", "762", "800"],
        correct: "755",
        explanation: "Hank Aaron finished his career with 755 home runs."
      },
      {
        id: 3,
        question: "What important lesson does Hank Aaron teach us?",
        options: ["Avoid difficult situations", "Perseverance and character are most important", "Only talent matters", "Give up when facing opposition"],
        correct: "Perseverance and character are most important",
        explanation: "Hank Aaron showed that perseverance and character are more important than anything else."
      }
    ]
  },

  // FOOTBALL ATHLETES (5 total - IDs 116-120)
  {
    id: 116,
    name: "Tom Brady",
    sport: "Football",
    image: "🏈",
    description: "Quarterback who never gave up and won 7 Super Bowls",
    story: `Tom Brady was born in California in 1977. He loved football from a young age and dreamed of playing in the NFL. But Tom wasn't the biggest, strongest, or fastest player. Many coaches and scouts didn't think he was good enough to be a professional football player.

When it came time for the NFL Draft, Tom was chosen very late - he was the 199th player picked! This meant that 198 players were chosen before him. Six other quarterbacks were picked before Tom. Most people thought he would never be an important player in the NFL.

But Tom proved everyone wrong. He worked harder than anyone else and studied the game more than any other player. He went on to win 7 Super Bowl championships, which is more than any other player in history. He played until he was 45 years old and showed that if you believe in yourself and work hard, you can overcome any obstacle.`,
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
    id: 117,
    name: "Joe Montana",
    sport: "Football",
    image: "🏈",
    description: "Joe Cool who stayed calm under pressure and won 4 Super Bowls",
    story: `Joe Montana was born in Pennsylvania in 1956. He got his nickname "Joe Cool" because he always stayed calm, even in the most stressful situations. As a young player, Joe wasn't the strongest or fastest, but he was incredibly smart and never panicked.

Joe played college football at Notre Dame, where he led his team to a national championship. He was known for making amazing comebacks when his team was losing. Even when things looked hopeless, Joe found a way to win.

In the NFL, Joe played for the San Francisco 49ers and won 4 Super Bowl championships. He was famous for his ability to perform his best when the pressure was highest. In the biggest moments, when other players might get nervous, Joe became even better. He taught us that staying calm and focused can help you succeed even in the most difficult situations.`,
    questions: [
      {
        id: 1,
        question: "How did Joe Montana get his nickname 'Joe Cool'?",
        options: ["He wore cool clothes", "He always stayed calm under pressure", "He was from a cold place", "He had cool hair"],
        correct: "He always stayed calm under pressure",
        explanation: "Joe got his nickname 'Joe Cool' because he always stayed calm, even in the most stressful situations."
      },
      {
        id: 2,
        question: "How many Super Bowl championships did Joe Montana win?",
        options: ["2", "3", "4", "5"],
        correct: "4",
        explanation: "Joe Montana won 4 Super Bowl championships with the San Francisco 49ers."
      },
      {
        id: 3,
        question: "What was Joe Montana's greatest strength?",
        options: ["Running fast", "Throwing hard", "Staying calm in pressure situations", "Being the biggest player"],
        correct: "Staying calm in pressure situations",
        explanation: "Joe's greatest strength was his ability to stay calm and perform his best when the pressure was highest."
      }
    ]
  },
  {
    id: 118,
    name: "Jerry Rice",
    sport: "Football",
    image: "🏈",
    description: "Greatest receiver who caught more passes than anyone through hard work",
    story: `Jerry Rice was born in Mississippi in 1962. He grew up in a small town where his family didn't have much money. His dad was a brick mason, and Jerry often helped him carry bricks and materials. This hard physical work made Jerry strong and gave him great hands for catching things.

In high school and college, Jerry wasn't heavily recruited by big schools. He went to a small college that most people had never heard of. But Jerry worked harder than anyone else and became an amazing player, catching so many passes that NFL scouts finally noticed him.

When Jerry joined the San Francisco 49ers, he continued his incredible work ethic. While other players went home after practice, Jerry stayed to run extra routes and catch more passes. He caught more passes, gained more yards, and scored more touchdowns than any receiver in NFL history. He proved that if you're willing to work harder than everyone else, you can achieve greatness.`,
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
  },
  {
    id: 119,
    name: "Jim Brown",
    sport: "Football",
    image: "🏈",
    description: "Dominant runner and social activist who stood up for what's right",
    story: `Jim Brown was born in Georgia in 1936 and grew up on Long Island, New York. He was an incredible athlete who was great at many sports - football, basketball, baseball, and track. But football was where he truly shined as one of the most powerful runners ever.

Jim played for the Cleveland Browns and was nearly impossible to tackle. He was strong, fast, and determined. In just 9 seasons, he became the greatest running back in football history. He led the league in rushing 8 out of his 9 seasons, which is an amazing record.

What made Jim special wasn't just his football skills. He was also brave enough to speak up about civil rights and social justice during a time when it was difficult and dangerous to do so. He used his fame to help fight for equality and showed that athletes can make a difference in the world beyond sports.`,
    questions: [
      {
        id: 1,
        question: "How many seasons did Jim Brown lead the league in rushing?",
        options: ["6 out of 9", "7 out of 9", "8 out of 9", "9 out of 9"],
        correct: "8 out of 9",
        explanation: "Jim Brown led the league in rushing 8 out of his 9 seasons, which is an amazing record."
      },
      {
        id: 2,
        question: "What made Jim Brown special beyond his football skills?",
        options: ["He was the tallest player", "He spoke up for civil rights and social justice", "He played the most games", "He was the richest player"],
        correct: "He spoke up for civil rights and social justice",
        explanation: "Jim was brave enough to speak up about civil rights and social justice, using his fame to fight for equality."
      },
      {
        id: 3,
        question: "What lesson does Jim Brown teach us?",
        options: ["Only focus on sports", "Athletes can make a difference beyond sports", "Avoid difficult topics", "Stay quiet about problems"],
        correct: "Athletes can make a difference beyond sports",
        explanation: "Jim Brown showed that athletes can use their platform to make a difference in the world beyond sports."
      }
    ]
  },
  {
    id: 120,
    name: "Peyton Manning",
    sport: "Football",
    image: "🏈",
    description: "Football genius who studied the game and won 2 Super Bowls",
    story: `Peyton Manning was born in Louisiana in 1976 into a football family - his dad was also an NFL quarterback. But Peyton didn't rely on his family name. He worked incredibly hard to become one of the smartest quarterbacks ever to play the game.

Peyton was famous for studying game film for hours and hours. He would watch videos of opposing teams until he knew exactly what they were going to do. Before each play, he would call out signals and change the play based on what he saw from the defense. His teammates called him "The Sheriff" because he was like the leader of the team.

Peyton won 2 Super Bowl championships and 5 Most Valuable Player awards. Even when he suffered a serious neck injury that almost ended his career, he came back and continued to play at a high level. He showed that intelligence, preparation, and leadership are just as important as physical talent in achieving success.`,
    questions: [
      {
        id: 1,
        question: "What did Peyton's teammates call him?",
        options: ["The General", "The Sheriff", "The Captain", "The Coach"],
        correct: "The Sheriff",
        explanation: "Peyton's teammates called him 'The Sheriff' because he was like the leader of the team."
      },
      {
        id: 2,
        question: "How many Super Bowl championships did Peyton Manning win?",
        options: ["1", "2", "3", "4"],
        correct: "2",
        explanation: "Peyton Manning won 2 Super Bowl championships during his career."
      },
      {
        id: 3,
        question: "What made Peyton Manning special as a quarterback?",
        options: ["He was the fastest runner", "He was the strongest thrower", "His intelligence and preparation", "He was the tallest player"],
        correct: "His intelligence and preparation",
        explanation: "Peyton was known for his intelligence, preparation, and leadership, studying game film for hours to understand opposing teams."
      }
    ]
  }
];

export const sportCategories = [
  { name: "Soccer", emoji: "⚽", athletes: suggestedAthletes.filter(a => a.sport === "Soccer").map(a => a.name) },
  { name: "Basketball", emoji: "🏀", athletes: suggestedAthletes.filter(a => a.sport === "Basketball").map(a => a.name) },
  { name: "Baseball", emoji: "⚾", athletes: suggestedAthletes.filter(a => a.sport === "Baseball").map(a => a.name) },
  { name: "Football", emoji: "🏈", athletes: suggestedAthletes.filter(a => a.sport === "Football").map(a => a.name) }
];
