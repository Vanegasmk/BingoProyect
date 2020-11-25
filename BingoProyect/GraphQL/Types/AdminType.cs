using GraphQL.Types;
using BingoProyect.Models;
using BingoProyect.Repositories;

namespace  BingoProyect.GraphQL.Types 
{
    class AdminType : ObjectGraphType<Admin>
    {
        public AdminType()
        {
            Name = "Admin";
            Field(x => x.Id).Description("Id of the admin");
            Field(x => x.Email).Description("Email of admin");
            Field(x => x.Password).Description("Password of admin");
        }
    }
}