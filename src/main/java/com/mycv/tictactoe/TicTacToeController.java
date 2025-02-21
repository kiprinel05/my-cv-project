package com.mycv.tictactoe;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tictactoe")
@CrossOrigin(origins = "*")
public class TicTacToeController {
    private final TicTacToeService ticTacToeService;

    public TicTacToeController(TicTacToeService ticTacToeService) {
        this.ticTacToeService = ticTacToeService;
    }

    @PostMapping("/move")
    public String makeMove(@RequestBody TicTacToeMove move) {
        if (!ticTacToeService.makeMove(move.getIndex(), move.getPlayer())) {
            return "Invalid move";
        }

        String result = ticTacToeService.checkWinner();
        if (!result.isEmpty()) return result;

        // 🔥 Folosește modul primit din request (easy/hard)
        int aiMove = ticTacToeService.computerMove(move.getDifficulty());
        if (aiMove != -1) {
            ticTacToeService.makeMove(aiMove, "O");
        }

        return ticTacToeService.checkWinner();
    }


    @GetMapping("/reset")
    public String resetGame() {
        ticTacToeService.resetBoard();
        return "Game reset!";
    }

    @GetMapping("/state")
    public String[] getGameState() {
        return ticTacToeService.getBoard();
    }


}
