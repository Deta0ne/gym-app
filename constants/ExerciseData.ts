export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  targetMuscles: MuscleGroup[];
  description: string;
  instructions: string[];
  imageUrl: string;
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
  FullBody = 'fullBody'
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
    imageUrl: 'https://example.com/bench-press.jpg',
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
    imageUrl: 'https://example.com/squat.jpg',
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
    imageUrl: 'https://example.com/pull-up.jpg',
    videoUrl: 'https://example.com/pull-up-video.mp4',
    difficulty: 'intermediate',
    equipment: ['Pull-up bar']
  },
  {
    id: '4',
    name: 'Plank',
    category: ExerciseCategory.Strength,
    targetMuscles: [MuscleGroup.Core, MuscleGroup.Shoulders],
    description: 'Karın ve kor kaslarını güçlendirmek için statik bir egzersizdir.',
    instructions: [
      'Dirsekleriniz ve ayak parmaklarınız üzerinde yüzüstü pozisyon alın',
      'Dirsekleriniz omuzlarınızın altında olmalı',
      'Vücudunuzu düz bir çizgi halinde tutun',
      'Karın kaslarınızı sıkın ve kalçanızı düşürmeyin',
      'Nefes almaya devam ederek pozisyonu koruyun'
    ],
    imageUrl: 'https://example.com/plank.jpg',
    difficulty: 'beginner',
    equipment: []
  },
  {
    id: '5',
    name: 'Jumping Jacks',
    category: ExerciseCategory.Cardio,
    targetMuscles: [MuscleGroup.FullBody],
    description: 'Tüm vücudu çalıştıran ve kalp atış hızını artıran basit bir kardio egzersizidir.',
    instructions: [
      'Ayaklarınız birleşik, kollarınız yanınızda olacak şekilde dik durun',
      'Aynı anda kollarınızı başınızın üzerine kaldırırken bacaklarınızı yana doğru açın',
      'Hızlı bir hareketle başlangıç pozisyonuna geri dönün',
      'Hareketi tekrarlayın'
    ],
    imageUrl: 'https://example.com/jumping-jacks.jpg',
    difficulty: 'beginner',
    equipment: []
  }
]; 