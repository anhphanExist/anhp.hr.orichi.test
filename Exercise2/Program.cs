// See https://aka.ms/new-console-template for more information

// Create an array of StudentScore

class Program
{
    public static void Main()
    {
        
        // a. Init Array with random data
        var studentScores = new List<StudentScore>
        {
            new StudentScore("Alice"),
            new StudentScore("Bob"),
            new StudentScore("Cuc"),
            new StudentScore("Dea"),
            new StudentScore("Ead"),
            new StudentScore("Fin"),
            new StudentScore("Ginnn"),
            new StudentScore("Helppppp"),
        };
        
        // b. Sort student scores
        HeapSort(studentScores);
        foreach (var student in studentScores)
        {
            Console.WriteLine($"Name: {student.Name}, Average Score: {student.AverageScore}");
        }
        
        // c. Get student have average score = 8
        int index = BinarySearch(studentScores, 0, studentScores.Count - 1, 8);
        if (index == -1)
        {
            Console.WriteLine("No student found with an average score of 8.");
            return;
        }
        
        Console.WriteLine($"Student '{studentScores[index].Name}' has an average score of 8.");
        
    }

    public static void HeapSort(List<StudentScore> arr)
    {
        int n = arr.Count;

        // Build heap (rearrange array)
        for (int i = n / 2 - 1; i >= 0; i--)
        {
            Heapify(arr, n, i);
        }

        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--)
        {
            // Move current root to end
            (arr[0], arr[i]) = (arr[i], arr[0]);

            // Call max heapify on the reduced heap
            Heapify(arr, i, 0);
        }
    }

    public static void Heapify(List<StudentScore> arr, int n, int i)
    {
        int largest = i; // Initialize largest as root
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        // If left child is larger than root
        if (left < n && (arr[left].AverageScore > arr[largest].AverageScore ||
                         (arr[left].AverageScore == arr[largest].AverageScore && string.CompareOrdinal(arr[left].Name, arr[largest].Name) >= 0)))
        {
            largest = left;
        }

        // If right child is larger than largest
        if (right < n && (arr[right].AverageScore > arr[largest].AverageScore ||
                          (arr[right].AverageScore == arr[largest].AverageScore && string.CompareOrdinal(arr[right].Name, arr[largest].Name) >= 0)))
        {
            largest = right;
        }

        // If largest is not root
        if (largest != i)
        {
            // swap
            (arr[i], arr[largest]) = (arr[largest], arr[i]);

            // Recursively heapify the affected sub-tree
            Heapify(arr, n, largest);
        }
    }
    
    private static int BinarySearch(List<StudentScore> arr, int startIndex, int endIndex, int target)
    {
        if (endIndex == startIndex && arr[startIndex].AverageScore == target)
        {
            return startIndex;
        }

        if (endIndex == startIndex && arr[startIndex].AverageScore != target)
        {
            return -1;
        }
        
        var medianIndex = (startIndex + endIndex) / 2;
        if (target <= arr[medianIndex].AverageScore)
        {
            return BinarySearch(arr, startIndex, medianIndex, target);
        }
        else
        {
            return BinarySearch(arr, medianIndex + 1, endIndex, target);
        }
    }
}


