class WelcomeController < ApplicationController
    def index
        render json: { status: 200, message: 'Products API' }
    end
end
