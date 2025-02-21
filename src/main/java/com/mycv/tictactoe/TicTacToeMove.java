package com.mycv.tictactoe;

public class TicTacToeMove {
    private int index;
    private String player; // "X" sau "O"
    private String difficulty;

    public TicTacToeMove() {}

    public TicTacToeMove(int index, String player, String difficulty) {
        this.index = index;
        this.player = player;
        this.difficulty = difficulty;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }
    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}
