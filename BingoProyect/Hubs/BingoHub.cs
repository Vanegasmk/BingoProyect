using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using BingoProyect.Models;

namespace BingoProyect.Hubs
{
    public class BingoHub : Hub
    {

        public async Task AddToGroup(string roomId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        }

        public Task SendCountToGroup(string groupname,int user)
        {
            return  Clients.Group(groupname).SendAsync("SendCount",user);
        }

        public Task SendNumbersBingo(string groupname, int number)
        {
            return Clients.Group(groupname).SendAsync("SendNumbers",number);
        }




    }

}
