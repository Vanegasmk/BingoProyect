using GraphQL.Types;
using BingoProyect.Repositories;
using BingoProyect.GraphQL.Types;
using BingoProyect.Models;


namespace  BingoProyect.GraphQL.Querys {
    class AdminQuery : ObjectGraphType
    {
        public AdminQuery(AdminRepository adminRepository)
        {
            Field<ListGraphType<AdminType>>("admin",
                              arguments: new QueryArguments(
                                  new QueryArgument<StringGraphType> { Name = "email" },
                                  new QueryArgument<StringGraphType> { Name = "password"}),
                              resolve: context => {
                                  return adminRepository.All(context);
                              });
        }
    }
}