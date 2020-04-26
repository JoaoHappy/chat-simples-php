<?php

namespace Joao\Socket;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }
    // Chamado quando um novo cliente está conectado
    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }
    //Chamado quando uma nova mensagem é recebida por um Connection
    public function onMessage(ConnectionInterface $from, $msg) {
        //$numRecv = count($this->clients) - 1;
        //echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
         //   , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

        foreach ($this->clients as $client) {
            if ($from !== $client) {
                // The sender is not the receiver, send to each client connected
                $client->send($msg);
            }
        }
    }
    //chamado quando uma conexão é fechada 
    public function onClose(ConnectionInterface $conn) {
        
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }
    // chamado quando ocorre um erro em uma conexão
    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}

?>