using GraphQL.Types;
using BingoProyect.Repositories;
using BingoProyect.GraphQL.Types;
using BingoProyect.Models;

namespace  BingoProyect.GraphQL.Mutations {
    class RoomMutation : ObjectGraphType
    {
        public RoomMutation(RoomRepository roomRepository, NumeroRepository numeroRepository)
        {
            Field<RoomType>("createRoom",
                              arguments: new QueryArguments(new QueryArgument<NonNullGraphType<RoomInputType>> { Name = "input" }),
                              resolve: context => {
                                  return roomRepository.Add(context.GetArgument<Room>("input"));
                              });
            
            Field<RoomType>("deleteRoom",
                              arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                              resolve: context => {
                                  return roomRepository.Remove(context.GetArgument<long>("id"));
                              });


            Field<NumeroType>("createNumero",
                              arguments: new QueryArguments(new QueryArgument<NonNullGraphType<NumeroInputType>> { Name = "input" }),
                              resolve: context => {
                                  return numeroRepository.Add(context.GetArgument<Numero>("input"));
                              });
            
            Field<NumeroType>("deleteNumero",
                              arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                              resolve: context => {
                                  return numeroRepository.Remove(context.GetArgument<long>("id"));
                              });
            Field<CardboardType>("createCardboard",
                                resolve: context => {
                                    return roomRepository.AddCardboard();
                                }
            );                              

        }
    }
}