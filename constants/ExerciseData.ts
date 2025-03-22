export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  targetMuscles: MuscleGroup[];
  description: string;
  instructions: string[];
  imageUrl: string;
  gifUrl: string;
  videoUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment?: string[];
}

export enum ExerciseCategory {
  Strength = 'strength',
  Cardio = 'cardio',
  Flexibility = 'flexibility',
  Balance = 'balance'
}

export enum MuscleGroup {
  Chest = 'chest',
  Back = 'back',
  Shoulders = 'shoulders',
  Arms = 'arms',
  Legs = 'legs',
  Core = 'core',
  FullBody = 'fullBody',
  Abs = 'abs'
}

// Sample exercise data
export const EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Bench Press',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Chest, MuscleGroup.Arms, MuscleGroup.Shoulders],
    description: 'Göğüs kaslarını geliştirmek için temel bir egzersizdir.',
    instructions: [
      'Bench üzerine sırt üstü uzanın',
      'Ayaklarınızı yere sağlam basın',
      'Barı omuz genişliğinde kavrayın',
      'Barı göğsünüze indirin',
      'Kollarınızı tamamen uzatana kadar barı itin'
    ],
    imageUrl: 'benchPressImage.png.jpeg',
    gifUrl: 'benchGif.gif',
    videoUrl: 'https://example.com/bench-press-video.mp4',
    difficulty: 'intermediate',
    equipment: ['Bench', 'Barbell', 'Weight plates']
  },
  {
    id: '2',
    name: 'Squat',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Legs, MuscleGroup.Core],
    description: 'Bacak kaslarını geliştirmek için temel bir egzersizdir.',
    instructions: [
      'Ayaklarınızı omuz genişliğinde açın',
      'Sırtınızı düz tutun',
      'Kalçanızı geriye doğru iterek çömelin',
      'Dizleriniz ayak parmaklarınızı geçmemeli',
      'Başlangıç pozisyonuna geri dönün'
    ],
    imageUrl: 'squatImage.jpeg',
    gifUrl: 'squatGif.gif',
    videoUrl: 'https://example.com/squat-video.mp4',
    difficulty: 'beginner',
    equipment: ['Barbell', 'Weight plates', 'Squat rack']
  },
  {
    id: '3',
    name: 'Pull-up',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Back, MuscleGroup.Arms],
    description: 'Sırt ve kol kaslarını geliştirmek için etkili bir egzersizdir.',
    instructions: [
      'Bar üzerinde elleriniz omuz genişliğinden biraz daha geniş olacak şekilde asılın',
      'Omuzlarınızı geriye ve aşağıya doğru çekin',
      'Çenenizi barın üzerine çıkarana kadar kendinizi yukarı çekin',
      'Kontrollü bir şekilde başlangıç pozisyonuna dönün'
    ],
    imageUrl: 'pullUpImage.jpeg',
    gifUrl: 'pullUpGif.gif',
    videoUrl: 'https://example.com/pull-up-video.mp4',
    difficulty: 'intermediate',
    equipment: ['Pull-up bar']
  },
  {
    id: '4',
    name: 'Plank',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Core, MuscleGroup.Shoulders, MuscleGroup.Abs],
    description: 'Karın ve kor kaslarını güçlendirmek için statik bir egzersizdir.',
    instructions: [
      'Dirsekleriniz ve ayak parmaklarınız üzerinde yüzüstü pozisyon alın',
      'Dirsekleriniz omuzlarınızın altında olmalı',
      'Vücudunuzu düz bir çizgi halinde tutun',
      'Karın kaslarınızı sıkın ve kalçanızı düşürmeyin',
      'Nefes almaya devam ederek pozisyonu koruyun'
    ],
    imageUrl: 'PlankImage.jpeg',
    gifUrl: 'PlankImage.jpeg',
    difficulty: 'beginner',
    equipment: []
  },
  {
    id: '5',
    name: 'Deadlift',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Back, MuscleGroup.Legs, MuscleGroup.Core, MuscleGroup.Abs],
    description: 'Sırt, bacak ve kor kaslarını güçlendiren temel bir bileşik egzersizdir.',
    instructions: [
      'Ayaklarınızı kalça genişliğinde açın',
      'Barın önünde durun, barı bacaklarınızın hemen dışında kavrayın',
      'Sırtınızı düz tutun, göğsünüzü yukarı kaldırın',
      'Kalçalarınızı menteşe gibi kullanarak barı yerden kaldırın',
      'Dizlerinizi ve kalçanızı düzleştirerek hareketi tamamlayın',
      'Kontrollü bir şekilde barı yere indirin'
    ],
    imageUrl: 'deadliftImage.jpeg',
    gifUrl: 'deadliftGif.gif',
    videoUrl: 'https://example.com/deadlift-video.mp4',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Weight plates']
  },
  {
    id: '6',
    name: 'Push-up',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Chest, MuscleGroup.Arms, MuscleGroup.Shoulders, MuscleGroup.Core, MuscleGroup.Abs],
    description: 'Üst vücut kas gruplarını geliştirmek için temel bir vücut ağırlığı egzersizidir.',
    instructions: [
      'Elleriniz omuz genişliğinden biraz daha geniş, parmak uçlarınız ileri bakacak şekilde plank pozisyonu alın',
      'Vücudunuzu düz bir çizgi halinde tutun',
      'Dirseklerinizi bükerek göğsünüzü yere doğru indirin',
      'Kollarınızı düzleştirerek başlangıç pozisyonuna dönün',
      'Hareketi yaparken nefes alıp vermeyi unutmayın'
    ],
    imageUrl: 'Push Up.webp',
    gifUrl: 'Push Up.webp',
    difficulty: 'beginner',
    equipment: []
  },
  {
    id: '7',
    name: 'Dumbbell Shoulder Press',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Shoulders, MuscleGroup.Arms],
    description: 'Omuz kaslarını geliştirmek için etkili bir üst vücut egzersizidir.',
    instructions: [
      'Dumbbell\'ları omuz hizasında, avuç içleri ileri bakacak şekilde tutun',
      'Sırtınızı düz tutun ve karın kaslarınızı sıkın',
      'Kollarınızı başınızın üzerine doğru uzatarak dumbbellları kaldırın',
      'Kontrollü bir şekilde başlangıç pozisyonuna dönün'
    ],
    imageUrl: 'Dumbbell Shoulder Press.jpeg',
    gifUrl: 'Dumbbell Shoulder Press.jpeg',
    difficulty: 'intermediate',
    equipment: ['Dumbbells']
  },
  {
    id: '8',
    name: 'Dumbbell Bicep Curl',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Arms],
    description: 'Biceps kaslarını izole etmek ve güçlendirmek için etkili bir egzersizdir.',
    instructions: [
      'Ayakta dik durun, her elinizde bir dumbbell tutun',
      'Avuç içleri vücudunuza bakacak şekilde kollarınızı yanlarınızda düz tutun',
      'Ön kolunuzu döndürün ve dirsekten bükerek dumbbellları omuzlarınıza doğru kaldırın',
      'Tepe noktada biceps kaslarınızı sıkın',
      'Kontrollü bir şekilde başlangıç pozisyonuna dönün'
    ],
    imageUrl: 'Dumbbell Bicep Curl.jpeg',
    gifUrl: 'Dumbbell Bicep Curl.jpeg',
    difficulty: 'beginner',
    equipment: ['Dumbbells']
  },
  {
    id: '9',
    name: 'Russian Twist',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Core, MuscleGroup.Abs],
    description: 'Karın ve oblik kasları güçlendirmek için etkili bir rotasyonel egzersizdir.',
    instructions: [
      'Yerde oturun, dizlerinizi hafifçe bükün ve ayaklarınızı yerden kaldırın',
      'Üst vücudunuzu hafifçe geriye doğru eğin',
      'Ellerinizi önünüzde birleştirin veya bir ağırlık tutun',
      'Üst vücudunuzu bir yandan diğer yana döndürün',
      'Her dönüşte karın kaslarınızı sıkın'
    ],
    imageUrl: 'Russian Twist.jpeg',
    gifUrl: 'Russian Twist.jpeg',
    difficulty: 'intermediate',
    equipment: ['Optional: Weight plate, medicine ball, or dumbbell']
  },
  {
    id: '10',
    name: 'Dumbbell Lunges',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Legs, MuscleGroup.Core, MuscleGroup.Abs],
    description: 'Bacak kaslarını ve dengeyi geliştiren etkili bir alt vücut egzersizidir.',
    instructions: [
      'Her elinizde bir dumbbell ile ayakta durun',
      'Bir adım öne atın ve ön dizinizi 90 derece, arka dizinizi yere yakın olacak şekilde bükün',
      'Ön bacağınızı kullanarak kendinizi başlangıç pozisyonuna geri itin',
      'Diğer bacakla tekrarlayın'
    ],
    imageUrl: 'Dumbbell Lunges.jpeg',
    gifUrl: 'Dumbbell Lunges.jpeg',
    difficulty: 'intermediate',
    equipment: ['Dumbbells']
  },
  {
    id: '11',
    name: 'Lat Pulldown',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Back, MuscleGroup.Arms],
    description: 'Sırt ve lats kaslarını geliştirmek için makine ile yapılan bir egzersizdir.',
    instructions: [
      'Lat pulldown makinesine oturun ve üst bacaklarınızı pedler altında sabitleyin',
      'Barı omuzlardan biraz daha geniş bir tutuşla kavrayın',
      'Sırtınızı hafifçe geriye doğru eğin',
      'Barı göğsünüzün üst kısmına doğru çekin',
      'Kontrollü bir şekilde barı başlangıç pozisyonuna geri bırakın'
    ],
    imageUrl: 'Lat Pulldown.jpeg',
    gifUrl: 'Lat Pulldown.jpeg',
    difficulty: 'beginner',
    equipment: ['Lat pulldown machine']
  },
  {
    id: '12',
    name: 'Cable Tricep Pushdown',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Arms],
    description: 'Triceps kaslarını izole etmek ve güçlendirmek için etkili bir egzersizdir.',
    instructions: [
      'Cable makinesine V-bar veya düz bar takın',
      'Kollarınız 90 derece bükülü olacak şekilde barı göğüs hizasında tutun',
      'Üst kollarınızı sabit tutarak önkollarınızı aşağı doğru itin',
      'Kollarınız tamamen düzleştiğinde triceps kaslarınızı sıkın',
      'Kontrollü bir şekilde başlangıç pozisyonuna dönün'
    ],
    imageUrl: 'Cable Tricep Pushdown.jpeg',
    gifUrl: 'Cable Tricep Pushdown.jpeg',
    difficulty: 'beginner',
    equipment: ['Cable machine', 'Pushdown bar attachment']
  },
  {
    id: '13',
    name: 'Leg Press',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Legs],
    description: 'Quadriceps, hamstrings ve gluteus kaslarını güçlendirmek için makine ile yapılan bir egzersizdir.',
    instructions: [
      'Leg press makinesine oturun ve ayaklarınızı platformda omuz genişliğinde yerleştirin',
      'Güvenlik mandallarını serbest bırakın ve platformu kontrollü bir şekilde kendinize doğru indirin',
      'Dizlerinizi 90 derece bükün',
      'Bacaklarınızı düzleştirerek platformu yukarı itin',
      'Dizlerinizi tamamen kilitlemeden tekrarlayın'
    ],
    imageUrl: 'Leg Press.jpeg',
    gifUrl: 'Leg Press.jpeg',
    difficulty: 'beginner',
    equipment: ['Leg press machine']
  },
  {
    id: '14',
    name: 'Mountain Climbers',
    category: ExerciseCategory.Cardio,
    targetMuscles: [MuscleGroup.Core, MuscleGroup.Legs, MuscleGroup.FullBody, MuscleGroup.Abs],
    description: 'Kardiyovasküler dayanıklılığı artıran ve birden fazla kas grubunu çalıştıran dinamik bir egzersizdir.',
    instructions: [
      'Plank pozisyonu alın, elleriniz omuz genişliğinde ve vücudunuz düz bir çizgi halinde olsun',
      'Bir dizinizi göğsünüze doğru çekin',
      'Hızlı bir hareketle bacakları değiştirin',
      'Koşma hareketi yapar gibi ritminizi koruyun',
      'Karın kaslarınızı sıkı tutun ve sırtınızı düz tutmaya özen gösterin'
    ],
    imageUrl: 'Mountain Climbers.jpeg',
    gifUrl: 'Mountain Climbers.jpeg',
    difficulty: 'intermediate',
    equipment: []
  },
  {
    id: '15',
    name: 'Dumbbell Row',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Back, MuscleGroup.Arms],
    description: 'Sırt kaslarını, özellikle latissimus dorsi ve rhomboidleri güçlendiren bir egzersizdir.',
    instructions: [
      'Bir elinizde dumbbell, diğer eliniz ve dizinizle bench\'e yaslanın',
      'Sırtınızı düz tutun ve dumbbelli elinizi aşağıda serbest bırakın',
      'Dirseklerinizi bükerek dumbbelli yanınıza doğru çekin',
      'Kürek kemiğinizi sıkıştırın ve tepe noktada bir saniye bekleyin',
      'Kontrollü bir şekilde başlangıç pozisyonuna dönün'
    ],
    imageUrl: 'Dumbbell Row.jpg',
    gifUrl: 'Dumbbell Row.jpg',
    difficulty: 'beginner',
    equipment: ['Dumbbell', 'Bench']
  },
  {
    id: '16',
    name: 'Jumping Jacks',
    category: ExerciseCategory.Cardio,
    targetMuscles: [MuscleGroup.FullBody, MuscleGroup.Legs, MuscleGroup.Shoulders],
    description: 'Tüm vücudu çalıştıran ve kardiyovasküler kapasiteyi artıran temel bir egzersizdir.',
    instructions: [
      'Ayaklarınız birleşik, kollarınız yanınızda olacak şekilde ayakta durun',
      'Aynı anda bacaklarınızı yana doğru açın ve kollarınızı başınızın üzerinde birleştirin',
      'Hızlı bir hareketle başlangıç pozisyonuna dönün',
      'Hareketi ritmik olarak tekrarlayın'
    ],
    imageUrl: 'Jumping Jacks.jpeg',
    gifUrl: 'Jumping Jacks.jpeg',
    difficulty: 'beginner',
    equipment: []
  },
  {
    id: '17',
    name: 'Burpees',
    category: ExerciseCategory.Cardio,
    targetMuscles: [MuscleGroup.FullBody, MuscleGroup.Chest, MuscleGroup.Arms, MuscleGroup.Legs, MuscleGroup.Core, MuscleGroup.Abs],
    description: 'Yüksek yoğunluklu, tüm vücudu çalıştıran ve kardiyovasküler dayanıklılığı artıran zorlayıcı bir egzersizdir.',
    instructions: [
      'Ayakta dik durun',
      'Çömelip ellerinizi yere koyun',
      'Ayaklarınızı geriye doğru atarak plank pozisyonuna geçin',
      'Bir şınav yapın (isteğe bağlı)',
      'Ayaklarınızı tekrar ellerinize doğru çekin',
      'Hızlıca yukarı sıçrayın ve kollarınızı başınızın üzerine kaldırın',
      'Yere iniş sonrası hareketi tekrarlayın'
    ],
    imageUrl: 'Burpees.jpeg',
    gifUrl: 'Burpees.jpeg',
    difficulty: 'advanced',
    equipment: []
  },
  {
    id: '18',
    name: 'High Knees',
    category: ExerciseCategory.Cardio,
    targetMuscles: [MuscleGroup.Legs, MuscleGroup.Core, MuscleGroup.Abs],
    description: 'Kalp atış hızını artıran ve alt vücut kaslarını çalıştıran yüksek tempolu bir egzersizdir.',
    instructions: [
      'Ayakta dik durun',
      'Olduğunuz yerde koşma hareketi yapın',
      'Dizlerinizi mümkün olduğunca yüksek kaldırın, ideali bel hizasına kadar',
      'Kollarınızı normal koşma hareketi gibi hareket ettirin',
      'Hızlı bir tempoda tekrarlayın'
    ],
    imageUrl: 'High Knees.jpeg',
    gifUrl: 'High Knees.jpeg',
    difficulty: 'intermediate',
    equipment: []
  },
  
  {
    id: '20',
    name: 'Butterfly Stretch',
    category: ExerciseCategory.Flexibility,
    targetMuscles: [MuscleGroup.Legs],
    description: 'İç bacak ve kasık bölgesini esneten etkili bir oturarak yapılan esneme hareketidir.',
    instructions: [
      'Yerde oturun ve ayak tabanlarınızı birbirine değdirin',
      'Topuklarınızı vücudunuza mümkün olduğunca yaklaştırın',
      'Dizlerinizi yavaşça yanlara doğru açın',
      'Ellerinizle ayak bileklerinizi veya ayaklarınızı tutun',
      'Sırtınızı düz tutarak hafifçe öne doğru eğilin',
      'Bu pozisyonda 30 saniye veya daha uzun süre kalın'
    ],
    imageUrl: 'Butterfly Stretch.webp',
    gifUrl: 'Butterfly Stretch.webp',
    difficulty: 'beginner',
    equipment: []
  },
  {
    id: '21',
    name: 'Child\'s Pose',
    category: ExerciseCategory.Flexibility,
    targetMuscles: [MuscleGroup.Back, MuscleGroup.Shoulders],
    description: 'Sırt, omuz ve kalça kaslarını rahatlatmaya yardımcı olan sakinleştirici bir yoga pozudur.',
    instructions: [
      'Dizleriniz üzerinde başlayın, kalçalar topuklara doğru',
      'Dizlerinizi kalça genişliğinde veya daha geniş açın',
      'Gövdenizi dizlerinizin arasına doğru öne eğin',
      'Kollarınızı önünüzde uzatın veya vücudunuzun yanlarına yerleştirin',
      'Alnınızı yere koyun ve tamamen rahat bırakın',
      'Bu pozisyonda derin nefes alarak 1-3 dakika kalın'
    ],
    imageUrl: 'Child\'s Pose.jpeg',
    gifUrl: 'Child\'s Pose.jpeg',
    difficulty: 'beginner',
    equipment: []
  },
  {
    id: '22',
    name: 'Single Leg Balance',
    category: ExerciseCategory.Balance,
    targetMuscles: [MuscleGroup.Legs, MuscleGroup.Core, MuscleGroup.Abs],
    description: 'Denge ve stabiliteyi geliştiren, çekirdek gücünü artıran basit bir duruş egzersizidir.',
    instructions: [
      'Ayakta dik durun, ayaklarınız kalça genişliğinde açık olsun',
      'Bir bacağınızı yerden kaldırın ve bükün',
      'Gözlerinizi sabit bir noktaya odaklayın',
      'Dengenizi korumak için karın kaslarınızı sıkın',
      'Pozisyonu 30 saniye koruyun, sonra bacakları değiştirin'
    ],
    imageUrl: 'Single Leg Balance.jpeg',
    gifUrl: 'Single Leg Balance.jpeg',
    difficulty: 'beginner',
    equipment: []
  },
  {
    id: '23',
    name: 'Yoga Tree Pose',
    category: ExerciseCategory.Balance,
    targetMuscles: [MuscleGroup.Legs, MuscleGroup.Core, MuscleGroup.Abs],
    description: 'Yogadan gelen, dengeyi, stabiliteyi ve odaklanmayı geliştiren bir duruş pozudur.',
    instructions: [
      'Ayakta dik durun, ağırlığınızı bir bacağınıza verin',
      'Diğer ayağınızı kaldırın ve tabanını destek bacağınızın iç uyluğuna yerleştirin',
      'Ellerinizi göğsünüzde birleştirin veya başınızın üzerine uzatın',
      'Gözlerinizi karşıya sabit bir noktaya odaklayın',
      'Dengenizi koruyarak 30-60 saniye bu pozisyonu sürdürün',
      'Bacakları değiştirerek tekrarlayın'
    ],
    imageUrl: 'Yoga Tree Pose.jpeg',
    gifUrl: 'Yoga Tree Pose.jpeg',
    difficulty: 'intermediate',
    equipment: []
  },
  {
    id: '24',
    name: 'Bosu Ball Squat',
    category: ExerciseCategory.Balance,
    targetMuscles: [MuscleGroup.Legs, MuscleGroup.Core, MuscleGroup.Abs],
    description: 'Bacak kaslarını güçlendirirken denge ve stabilitenizi geliştiren birleşik bir egzersizdir.',
    instructions: [
      'Bosu topu düz tarafı yukarı gelecek şekilde yere yerleştirin',
      'Topun üzerine çıkın, ayaklarınız omuz genişliğinde açık olsun',
      'Kollarınızı önünüzde uzatın veya göğsünüzde çaprazlayın',
      'Sırtınızı düz tutarak, dizlerinizi ve kalçanızı bükerek squat pozisyonuna inin',
      'Bacaklarınızı düzleştirerek başlangıç pozisyonuna dönün',
      'Dengenizi koruyarak hareketi tekrarlayın'
    ],
    imageUrl: 'Bosu Ball Squat.jpeg',
    gifUrl: 'Bosu Ball Squat.jpeg',
    difficulty: 'intermediate',
    equipment: ['Bosu ball']
  },
  {
    id: '25',
    name: 'Jumping Rope',
    category: ExerciseCategory.Cardio,
    targetMuscles: [MuscleGroup.Legs, MuscleGroup.Core, MuscleGroup.Shoulders, MuscleGroup.Abs],
    description: 'Kardiyovasküler dayanıklılık ve koordinasyonu geliştiren, kalori yakmada oldukça etkili bir egzersizdir.',
    instructions: [
      'Ellerinizde bir atlama ipi ile ayakta durun',
      'İpi başınızın arkasından öne doğru döndürün',
      'İp yere yaklaştığında, ayaklarınızı hafifçe yerden kaldırarak ipten atlayın',
      'Bileklerinizi kullanarak ipi döndürmeye devam edin',
      'Ritminizi koruyarak hareketi tekrarlayın'
    ],
    imageUrl: 'Jumping Rope.jpeg',
    gifUrl: 'Jumping Rope.jpeg',
    difficulty: 'intermediate',
    equipment: ['Jump rope']
  },
  {
    id: '26',
    name: 'Crunches',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Abs, MuscleGroup.Core],
    description: 'Karın kaslarını, özellikle rectus abdominis (six-pack) kaslarını güçlendiren temel bir egzersizdir.',
    instructions: [
      'Sırt üstü uzanın, dizlerinizi bükün ve ayaklarınızı yere basın',
      'Ellerinizi başınızın arkasında veya göğsünüzde çaprazlayın',
      'Karın kaslarınızı kullanarak üst vücudunuzu yerden kaldırın',
      'Omuzlarınız yerden kalktığında bir saniye bekleyin',
      'Kontrollü bir şekilde başlangıç pozisyonuna dönün'
    ],
    imageUrl: 'Crunches.jpeg',
    gifUrl: 'Crunches.jpeg',
    difficulty: 'beginner',
    equipment: []
  },
  {
    id: '27',
    name: 'Leg Raises',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Abs, MuscleGroup.Core],
    description: 'Alt karın kaslarını güçlendiren etkili bir egzersizdir.',
    instructions: [
      'Sırt üstü uzanın, bacaklarınızı uzatın ve ellerinizi kalçalarınızın yanına koyun',
      'Sırtınızı yere bastırın ve karın kaslarınızı sıkın',
      'Bacaklarınızı düz bir şekilde yerden kaldırın',
      'Bacaklarınız vücudunuzla 90 derece açı oluşturana kadar kaldırın',
      'Kontrollü bir şekilde başlangıç pozisyonuna dönün'
    ],
    imageUrl: 'Leg Raises.jpeg',
    gifUrl: 'Leg Raises.jpeg',
    difficulty: 'intermediate',
    equipment: []
  },
  {
    id: '28',
    name: 'Bicycle Crunches',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Abs, MuscleGroup.Core],
    description: 'Düz ve yan karın kaslarını çalıştıran etkili bir rotasyonel karın egzersizidir.',
    instructions: [
      'Sırt üstü uzanın, ellerinizi başınızın arkasına yerleştirin',
      'Dizlerinizi kaldırıp 90 derece açıyla bükün',
      'Bir dizinizi göğsünüze doğru çekerken diğer bacağınızı düzleştirin',
      'Aynı zamanda üst vücudunuzu bükülen dizinize doğru döndürün',
      'Bacaklarınızı ve üst vücudunuzu bisiklet çevirir gibi değiştirin'
    ],
    imageUrl: 'Bicycle Crunches.jpeg',
    gifUrl: 'Bicycle Crunches.jpeg',
    difficulty: 'intermediate',
    equipment: []
  },
  {
    id: '29',
    name: 'Hanging Leg Raise',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Abs, MuscleGroup.Core],
    description: 'Bar kullanılarak karın kaslarını güçlendiren, özellikle alt karın kaslarına odaklanan zorlu bir egzersizdir.',
    instructions: [
      'Bir barı omuz genişliğinde kavrayın ve asılın',
      'Vücudunuzu sabit tutun ve sallanmayı engelleyin',
      'Karın kaslarınızı kullanarak bacaklarınızı kontrollü bir şekilde kaldırın',
      'Bacaklarınız yere paralel olana kadar kaldırın',
      'Bacaklarınızı yavaşça başlangıç pozisyonuna indirin'
    ],
    imageUrl: 'Hanging Leg Raise.png',
    gifUrl: 'Hanging Leg Raise.png',
    difficulty: 'advanced',
    equipment: ['Pull-up bar']
  },
  {
    id: '30',
    name: 'Flutter Kicks',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Abs, MuscleGroup.Core],
    description: 'Alt karın kaslarını güçlendiren ve çekirdek dayanıklılığını artıran bir egzersizdir.',
    instructions: [
      'Sırt üstü uzanın, bacaklarınızı uzatın ve ellerinizi kalçalarınızın altına yerleştirin',
      'Başınızı ve omuzlarınızı hafifçe yerden kaldırın (isteğe bağlı)',
      'Sırtınızı yere bastırın ve bacaklarınızı birkaç santim yerden kaldırın',
      'Bacaklarınızı alternatif olarak yukarı ve aşağı hareket ettirin',
      'Bacaklarınızı yüzme hareketi yapar gibi çırpın',
      'Hareketi yaparken karın kaslarınızı sürekli sıkı tutun'
    ],
    imageUrl: 'Flutter Kicks.jpeg',
    gifUrl: 'Flutter Kicks.jpeg',
    difficulty: 'intermediate',
    equipment: []
  }
]; 