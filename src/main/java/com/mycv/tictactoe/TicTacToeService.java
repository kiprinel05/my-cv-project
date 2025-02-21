package com.mycv.tictactoe;

import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class TicTacToeService {
    private String[] board;
    private final List<int[]> winPatterns = List.of(
            new int[]{0, 1, 2}, new int[]{3, 4, 5}, new int[]{6, 7, 8},
            new int[]{0, 3, 6}, new int[]{1, 4, 7}, new int[]{2, 5, 8},
            new int[]{0, 4, 8}, new int[]{2, 4, 6}
    );

    public TicTacToeService() {
        resetBoard();
    }

    public void resetBoard() {
        board = new String[]{"", "", "", "", "", "", "", "", ""};
    }

    public boolean makeMove(int index, String player) {
        if (board[index].isEmpty()) {
            board[index] = player;
            return true;
        }
        return false;
    }

    public String checkWinner() {
        for (int[] pattern : winPatterns) {
            if (!board[pattern[0]].isEmpty() &&
                    board[pattern[0]].equals(board[pattern[1]]) &&
                    board[pattern[0]].equals(board[pattern[2]])) {
                return board[pattern[0]];
            }
        }
        return Arrays.stream(board).noneMatch(String::isEmpty) ? "Draw" : "";
    }

    public int computerMove(String mode) {
        List<Integer> availableMoves = getAvailableMoves();
        if (availableMoves.isEmpty()) return -1;

        if ("hard".equals(mode)) {
            return bestMove(); // AI inteligent cu Minimax
        } else {
            return availableMoves.get(new Random().nextInt(availableMoves.size())); // Mutare random pentru Easy Mode
        }
    }


    private List<Integer> getAvailableMoves() {
        return Arrays.stream(new int[]{0, 1, 2, 3, 4, 5, 6, 7, 8})
                .filter(i -> board[i].isEmpty())
                .boxed().toList();
    }

    private int bestMove() {
        int bestScore = Integer.MIN_VALUE, move = -1;
        for (int i : getAvailableMoves()) {
            board[i] = "O";
            int score = minimax(false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
        return move;
    }

    private int minimax(boolean isMaximizing) {
        String winner = checkWinner();
        if (winner.equals("X")) return -10;
        if (winner.equals("O")) return 10;
        if (winner.equals("Draw")) return 0;

        int bestScore = isMaximizing ? Integer.MIN_VALUE : Integer.MAX_VALUE;
        for (int i : getAvailableMoves()) {
            board[i] = isMaximizing ? "O" : "X";
            int score = minimax(!isMaximizing);
            board[i] = "";
            bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
        }
        return bestScore;
    }
    public String[] getBoard() {
        return board;
    }

}
