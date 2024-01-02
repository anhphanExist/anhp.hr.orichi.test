public class StudentScore
{
    public StudentScore(string name)
    {
        Name = name;
        Score = new ScoreDetails();
    }

    public string Name { get; set; }
    public ScoreDetails Score { get; set; }
    public int AverageScore => (Score.Chemistry + Score.Math + Score.Physics) / 3;
}

public class ScoreDetails
{
    public ScoreDetails()
    {
        Math = GenerateRandomScore();
        Physics = GenerateRandomScore();
        Chemistry = GenerateRandomScore();
    }

    public int Math { get; set; }
    public int Physics { get; set; }
    public int Chemistry { get; set; }

    // Method to generate random scores between 1 to 10
    public static int GenerateRandomScore()
    {
        Random random = new Random();
        return random.Next(1, 11); // Generates random scores between 1 to 10
    }
}