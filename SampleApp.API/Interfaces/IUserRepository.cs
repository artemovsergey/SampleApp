using SampleApp.API.Entities;

public interface IUserRepository
{
   User CreateUser(User user);
   List<User> GetUsers();
   User EditUser(User user, int id);
   bool DeleteUser(int id);
   User FindUserById(int id);
}