using GraphQL.Types;
using BingoProyect.Repositories;
using BingoProyect.GraphQL.Types;
using BingoProyect.Models;


namespace BingoProyect.GraphQL.Querys
{
    class RoomQuery : ObjectGraphType
    {
        public RoomQuery(RoomRepository roomRepository, AdminRepository adminRepository, NumeroRepository numeroRepository)
        {
            Field<ListGraphType<RoomType>>("rooms",
                              arguments: new QueryArguments(new QueryArgument<StringGraphType> { Name = "name" }),
                              resolve: context =>
                              {
                                  return roomRepository.All(context);
                              });

            Field<ListGraphType<AdminType>>("admin",
                              arguments: new QueryArguments(
                                  new QueryArgument<StringGraphType> { Name = "email" },
                                  new QueryArgument<StringGraphType> { Name = "password" }),
                              resolve: context =>
                              {
                                  return adminRepository.All(context);
                              });

            Field<ListGraphType<NumeroType>>("numero",
                              arguments: new QueryArguments(
                                  new QueryArgument<IntGraphType> { Name = "num" }),
                              resolve: context =>
                              {
                                  return numeroRepository.All(context);
                              });

            Field<ListGraphType<NumeroType>>("numeros",
                                             arguments: new QueryArguments(
                                                 new QueryArgument<IntGraphType> { Name = "num" }
                                             ),
                                             resolve: context => {
                                                 return numeroRepository.All(context);
                                             });

            Field<CardboardType>("cardboard",
                                arguments: new QueryArguments(
                                    new QueryArgument<IntGraphType> { Name = "id" }),
                                resolve: context =>
                                {
                                    return roomRepository.FindCardboard(context.GetArgument<long>("id"));
                                });
        }
    }
}


